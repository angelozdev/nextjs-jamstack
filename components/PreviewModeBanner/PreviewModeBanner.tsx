import { Button, LabTestIcon, Pane, Portal, Tooltip } from "evergreen-ui";
import { useEffect, useState } from "react";

type Response = {
  preview: boolean;
  context: Record<string, any>;
};

function PreviewModeBanner() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    window
      .fetch("/api/preview/status")
      .then((response) => response.json())
      .then(({ preview }: Response) => {
        setIsPreviewMode(preview);
      });
  }, []);

  if (!isPreviewMode) return null;

  return (
    <Portal>
      <Pane
        elevation={4}
        backgroundColor="transparent"
        position="fixed"
        bottom={10}
        right={10}
      >
        <Tooltip content="Currently you are in preview mode. Click to disable.">
          <Button
            intent="none"
            appearance="primary"
            is="a"
            iconBefore={LabTestIcon}
            href="/api/preview/clear"
          >
            Disable preview mode
          </Button>
        </Tooltip>
      </Pane>
    </Portal>
  );
}

export default PreviewModeBanner;
