import { useState, useEffect } from "react";

function getIsClient() {
  return typeof window !== "undefined";
}

function DisableServerSideRender({ children }: { children: any }) {
  const [isRenderPage, setIsRenderPage] = useState(false);

  useEffect(() => {
    setIsRenderPage(getIsClient());
  }, []);

  if (isRenderPage) {
    return children;
  }

  return null;
}

export default DisableServerSideRender;
