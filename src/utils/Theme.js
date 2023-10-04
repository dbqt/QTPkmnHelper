export const ModalTheme = {
    "root": {
      "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-80",
        "off": "hidden"
      },
    },
    "content": {
      "base": "relative h-full w-full p-4 md:h-auto ",
      "inner": "relative rounded-lg shadow flex flex-col max-h-[90vh] bg-sky-800 text-white"
    },
    "body": {
      "base": "p-6 flex-1 overflow-auto ",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t p-5",
      "popup": "",
      "title": "text-xl font-medium text-white ",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white hover:bg-gray-200 hover:text-gray-900 ",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 p-6",
      "popup": ""
    }
  };