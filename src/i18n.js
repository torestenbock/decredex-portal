import path from 'path'
import NextI18Next from 'next-i18next'



module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['se'],
  localePath: path.resolve('public/locales')
})
