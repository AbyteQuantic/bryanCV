import appData from "@data/app.json";
import { useLocale } from "@library/useLocale";

const DefaultFooter = ( { extraClass } ) => {
  const locale = useLocale();
  const isEs = locale === 'es';

  return (
    <>
    {/* footer */}
    <footer className="mil-fw">
      <p className="mil-light-soft">{isEs ? appData.footer.copyEs : appData.footer.copy}</p>
      <p className="mil-light-soft" dangerouslySetInnerHTML={{__html : isEs ? appData.footer.devEs : appData.footer.dev}} />
    </footer>
    {/* footer end */}
    </>
  );
};
export default DefaultFooter;
