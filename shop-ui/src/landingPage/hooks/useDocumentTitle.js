import { useEffect } from "react";
import formatSlugTitle from "../../utils/formatSlugTitle";

const DEFAULT_TITLE = "Origins of Beauty";

const useDocumentTitle = (slug) => {
  useEffect(() => {
    document.title = slug ? formatSlugTitle(slug) : DEFAULT_TITLE;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [slug]);
};

export default useDocumentTitle;
