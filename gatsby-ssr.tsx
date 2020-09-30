import type { ReplaceRendererArgs } from "gatsby"
import type React from "react"

import { renderToString } from "react-dom/server"
import { css } from "./stitches.config"

let renderBody: () => void

interface Setup {
  (props: { element: React.ReactElement }): {
    collect: () => {
      styles: string[]
      bodyHTML: string
    }
  }
}
export const setup: Setup = ({ element }) => {
  renderBody = () => renderToString(element)

  const collect = () => {
    const { styles, result: bodyHTML } = css.getStyles(renderBody)
    return { styles, bodyHTML }
  }

  return { collect }
}

interface ReplaceRenderer {
  (args: ReplaceRendererArgs, pluginOptions: unknown): any
}
export const replaceRenderer: ReplaceRenderer = ({
  bodyComponent,
  setHeadComponents,
  replaceBodyHTMLString,
}) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  const instance = setup({
    element: bodyComponent as React.ReactElement,
  })

  const { styles, bodyHTML } = instance.collect()

  setHeadComponents(
    styles.map((sheet, i) => (
      <style
        key={i}
        data-stitches
        dangerouslySetInnerHTML={{ __html: sheet }}
      />
    ))
  )

  replaceBodyHTMLString(bodyHTML)
}
