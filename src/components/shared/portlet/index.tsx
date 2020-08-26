import React, { useContext, useState } from "react";
import classNames from "classnames";

interface PortletContextProps {
  openBody: () => void
  closeBody: () => void
  toggleBody: () => void
  bodyClosed?: boolean
}

const PortletContext = React.createContext<PortletContextProps>({
  openBody: () => { },
  closeBody: () => { },
  toggleBody: () => { }
});

export const usePortletContext = () => useContext(PortletContext);

interface PortletProps extends React.HTMLProps<HTMLDivElement> {
  initialClosed?: boolean,
}

const Portlet: React.FC<PortletProps> = ({ initialClosed, className, children, ...rest }) => {

  const [bodyClosed, setBodyClosed] = useState<boolean>(initialClosed || false);

  const classes = classNames({
    'portlet': true,
    [className!]: className !== undefined
  });

  return (
    <PortletContext.Provider
      value={{
        openBody: () => setBodyClosed(false),
        closeBody: () => setBodyClosed(true),
        toggleBody: () => setBodyClosed((p) => (!p)),
        bodyClosed: bodyClosed
      }}
    >
      <div className={classes} {...rest} >
        {children}
      </div>
    </PortletContext.Provider>

  );
}

export default Portlet;