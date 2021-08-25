import { Button, LabTestIcon, Pane, Portal, Tooltip } from "evergreen-ui";
import { useState } from "react";

function PreviewModeBanner() {
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  if (!isPreviewMode) return null;

  return (
    <Portal>
      <Pane
        elevation={4}
        backgroundColor="transparent"
        position="fixed"
        bottom={20}
        right={20}
      >
        <Tooltip content="Currently you are in preview mode. Click to disable.">
          <Button
            textTransform="uppercase"
            iconBefore={LabTestIcon}
            appearance="primary"
            intent="none"
          >
            Disable preview mode
          </Button>
        </Tooltip>
      </Pane>
    </Portal>
  );
}

export default PreviewModeBanner;
