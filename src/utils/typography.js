import Typography from "typography";
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'

// Theme Overrides
usWebDesignStandardsTheme.baseFontSize = '16px'
usWebDesignStandardsTheme.baseLineHeight = 1.65
usWebDesignStandardsTheme.scaleRatio = 4.00
usWebDesignStandardsTheme.bodyGray = 40
usWebDesignStandardsTheme.headerFontFamily = ['Montserrat', 'sans-serif']
usWebDesignStandardsTheme.bodyFontFamily = ['Lato', 'sans-serif']

const typography = new Typography(usWebDesignStandardsTheme)

export default typography;