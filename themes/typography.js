const font = "'Bree Serif', serif";

export function themeTypography(theme) {
  return {
    fontFamily: font,
    h6: {
      fontWeight: 500,
      color: theme.heading,
    },
    h5: {
      color: theme.heading,
      fontWeight: 500,
    },
    h4: {
      color: theme.heading,
      fontWeight: 600,
    },
    h3: {
      color: theme.heading,
      fontWeight: 600,
    },
    h2: {
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      color: theme.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontWeight: 400,
      color: theme.darkTextSecondary,
    },
    caption: {
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
      lineHeight: "1.334em",
    },
    body2: {
      letterSpacing: "0em",
      fontWeight: 400,
      lineHeight: "1.5em",
      color: theme.darkTextPrimary,
    },
    customInput: {
      marginTop: 8,
      marginBottom: 8,
      "& > label": {
        top: "23px",
        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: "5px",
        },
      },
      "& > div > input": {
        padding: "30.5px 14px 11.5px !important",
      },
      "& legend": {
        display: "none",
      },
      "& fieldset": {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: theme.background,
      width: "100%",
      minHeight: "calc(100vh - 88px)",
      flexGrow: 1,
      padding: "20px",
      marginTop: "88px",
      marginRight: "20px",
      borderRadius: theme.borderRadius + "px",
    },
    menuCaption: {
      fontWeight: 500,
      color: theme.heading,
      padding: "6px",
      textTransform: "capitalize",
      marginTop: "10px",
    },
    subMenuCaption: {
      fontWeight: 500,
      color: theme.darkTextSecondary,
      textTransform: "capitalize",
    },
    commonAvatar: {
      cursor: "pointer",
      borderRadius: "8px",
    },
    smallAvatar: {
      width: "22px",
      height: "22px",
    },
    mediumAvatar: {
      width: "34px",
      height: "34px",
    },
    largeAvatar: {
      width: "44px",
      height: "44px",
    },
  };
}
