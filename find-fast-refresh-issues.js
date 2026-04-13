const fs = require('fs');
const path = require('path');

console.log('🔍 Buscando problemas específicos de Fast Refresh...\n');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const fileName = path.basename(filePath);
  
  // 1. CRÍTICO: Export default anónimo
  if (content.match(/export\s+default\s+\(\s*\)\s*=>/)) {
    issues.push('🚨 CRÍTICO: export default () => ... (línea: ' + getLineNumber(content, /export\s+default\s+\(\s*\)\s*=>/) + ')');
  }
  
  // 2. CRÍTICO: Function sin nombre en export default
  if (content.match(/export\s+default\s+function\s*\(/)) {
    issues.push('🚨 CRÍTICO: export default function() sin nombre (línea: ' + getLineNumber(content, /export\s+default\s+function\s*\(/) + ')');
  }
  
  // 3. CRÍTICO: Componentes con minúscula
  const componentMatches = content.match(/const\s+([a-z][a-zA-Z]*)\s*=.*=>/g);
  if (componentMatches) {
    componentMatches.forEach(match => {
      const name = match.match(/const\s+([a-z][a-zA-Z]*)/)[1];
      issues.push(`🚨 CRÍTICO: Componente "${name}" empieza con minúscula`);
    });
  }
  
  // 4. Multiple default exports
  const defaultExportCount = (content.match(/export\s+default/g) || []).length;
  if (defaultExportCount > 1) {
    issues.push('🚨 CRÍTICO: Múltiples export default en el mismo archivo');
  }
  
  // 5. Hooks fuera de componentes
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.trim().match(/^use[A-Z]/) && !line.includes('function') && !line.includes('const') && !line.includes('=')) {
      issues.push(`⚠️  Hook posiblemente mal ubicado en línea ${index + 1}: ${line.trim()}`);
    }
  });
  
  // 6. Console.log en render
  if (content.includes('console.log') && !content.includes('useEffect')) {
    issues.push('⚠️  console.log directo en render (puede causar re-renders)');
  }
  
  return issues;
}

function getLineNumber(content, regex) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      return i + 1;
    }
  }
  return '?';
}

function scanDirectory(dir) {
  let allIssues = {};
  
  if (!fs.existsSync(dir)) return allIssues;
  
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && !['node_modules', '.next', '.git'].includes(file.name)) {
      Object.assign(allIssues, scanDirectory(fullPath));
    } else if (file.name.match(/\.(js|jsx|ts|tsx)$/)) {
      try {
        const issues = checkFile(fullPath);
        if (issues.length > 0) {
          allIssues[fullPath] = issues;
        }
      } catch (err) {
        console.log(`❌ Error leyendo ${fullPath}: ${err.message}`);
      }
    }
  }
  
  return allIssues;
}

// Escanear carpetas relevantes
const allIssues = {
  ...scanDirectory('./src'),
  ...scanDirectory('./pages'),
  ...scanDirectory('./components'),
};

if (Object.keys(allIssues).length === 0) {
  console.log('✅ No se encontraron problemas obvios de Fast Refresh');
  console.log('💡 El problema puede ser:');
  console.log('  - Configuración de Next.js');
  console.log('  - Dependencias conflictivas');
  console.log('  - Cache corrupto');
} else {
  console.log('🚨 PROBLEMAS ENCONTRADOS:\n');
  
  for (const [file, issues] of Object.entries(allIssues)) {
    console.log(`📄 ${file}:`);
    issues.forEach(issue => console.log(`  ${issue}`));
    console.log('');
  }
  
  console.log('🔧 SOLUCIONES:');
  console.log('  1. Cambiar export default () => por export default function NombreComponente()');
  console.log('  2. Asegurar que componentes empiecen con mayúscula');
  console.log('  3. Un solo export default por archivo');
  console.log('  4. Hooks solo dentro de componentes');
}

console.log('\n📋 EJEMPLOS DE CÓDIGO CORRECTO:');
console.log(`
✅ CORRECTO:
export default function MyComponent() {
  return <div>Hello</div>
}

❌ INCORRECTO:
export default () => <div>Hello</div>
const myComponent = () => <div>Hello</div>
`);