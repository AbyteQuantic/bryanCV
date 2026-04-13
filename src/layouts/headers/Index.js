import HeaderLayoutDefault from "./LayoutDefault";

const Header = ({ layout, extraClass }) => {
  switch ({layout}) {
    case 1:
      return (
        <HeaderLayoutDefault
          extarclassName={extraClass}
        />
      );

    case 2:
      return (
        <HeaderLayoutDefault
          extarclassName={extraClass}
        />
      );

    default:
      return (
        <HeaderLayoutDefault
          extarclassName={extraClass}
        />
      );
  }
};
export default Header;
