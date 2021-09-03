import { useRouter } from "next/router";
import { Button, LabTestIcon, Pane, Portal, Tooltip } from "evergreen-ui";

import { Routes } from "@utils/constants";

function PreviewModeBanner() {
  const router = useRouter();
  if (!router.isPreview) return null;
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
            href={`${Routes.CLEAR_PREVIEW_MODE}?callback=${router.asPath}`}
          >
            Disable preview mode
          </Button>
        </Tooltip>
      </Pane>
    </Portal>
  );
}

export default PreviewModeBanner;
