module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'jsx', 'python', 'cpp', 'html', 'handlebars'],
        plugins: ['custom-class'],
      },
    ],
  ],
};
