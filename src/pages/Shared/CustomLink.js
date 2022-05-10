import { Link, useMatch, useResolvedPath } from "react-router-dom";
import * as React from "react";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{
          color: match ? "goldenrod" : "white",
          margin: "10px",
          paddingBottom: "10px",
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
