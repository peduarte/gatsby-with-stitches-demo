const { createElement } = require("react")
const { renderToString } = require("react-dom/server")
const { css } = require("./stitches.config")

exports.replaceRenderer = ({ bodyComponent, setHeadComponents }) => {
  const { styles } = css.getStyles(() => renderToString(bodyComponent))

  setHeadComponents(
    styles.map((sheet, i) =>
      createElement(
        "style",
        { key: i, dangerouslySetInnerHTML: { __html: sheet } },
        null
      )
    )
  )
}
