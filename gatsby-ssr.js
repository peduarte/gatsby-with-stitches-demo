import * as React from "react"
import { getCssString } from "./src/stitches.config"

import type { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs) => {
  setHeadComponents([
    <style
      id="stitches"
      dangerouslySetInnerHTML={{ __html: getCssString() }}
    />,
  ])
}
