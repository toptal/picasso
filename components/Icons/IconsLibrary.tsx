import React from 'react'

class IconsLibrary {
  static listOfImportedIcons: {
    [index: string]: { component: React.ReactNode }
  } = {}

  static add (...icons: any[]) {
    icons.forEach(icon => {
      this.listOfImportedIcons[icon.name] = icon
    })
  }
}

export default IconsLibrary
