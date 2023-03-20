let num = 0;
mermaid.initialize({startOnLoad: false});
window.$docsify = {
  logo: '_media/images/logo.512.png',
  name: 'Wegar',
  nameLink: {
    '/zh-cn/': '/zh-cn/',
    '/en/': '/en/',
  },
  // homepage:'start.md',
  coverpage: ['/', '/en/', '/zh-cn/'],
  themeColor: '#4180c7',
  topMargin: 30,
  formatUpdated(time) {
    window.docLastModified = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    return window.docLastModified
  },
  notFoundPage: true,
  externalLinkTarget: '_blank',
  repo: 'https://github.com/qnnp-me/wegar',
  auto2top: true,
  executeScript: true,
  vueGlobalOptions: {
    data() {
      return {
        dayjs,
      }
    },
  },
  vueComponents: {
    'v-last-modified': {
      template: `<span class="modified"><span class="icon-app-nodate"/> {{ label }} {{ lastModified }}</span>`,
      data() {
        return {
          lastModified: window.docLastModified,
          label: ({
            'zh-cn': '本页更新时间：',
            'en': 'This page was last updated:',
          })[window.location.pathname.split('/')[1] || 'zh-cn']
        };
      },
    },
    'v-footer': {
      template: `
        <div class="footer">
          <div class="left">
              <div class="copy-right">
                  <img src="/_media/images/logo.256.png" alt="Wegar" width="12">
                  &copy; {{ dayjs().format('YYYY') }}
                  <a href="https://qnnp.me" target="_blank">qnnp</a>.
              </div>
          </div>
          <div class="left">
              <v-last-modified/>
          </div>
        </div>
      `,
      data() {
        return {
          dayjs
        }
      }
    }
  },
  vueMounts: {
    '.v-footer': {
      template: `<v-footer/>`,
      data() {
        return {}
      }
    }
  },
  plugins: [
    (hook, vm) => {
      // Footer
      hook.beforeEach((content) => content + "<div class='v-footer'></div>");
    },
    EditOnGithubPlugin.create('https://github.com/qnnp-me/wegar-doc/tree/main', null, (file) => {
      if (file.indexOf('en') === -1) {
        return '编辑文档'
      } else {
        return 'Edit on github'
      }
    })
  ],
  onlyCover: true,
  autoHeader: true,
  loadSidebar: true,
  subMaxLevel: 3,
  loadNavbar: true,
  mergeNavbar: true,
  relativePath: true,
  fallbackLanguages: ['en', 'zh-cn'],
  alias: {},
  search: {
    placeholder: {
      '/zh-cn/': '搜索',
      '/en/': 'Type to search'
    },
    noData: {
      '/zh-cn/': '找不到结果',
      '/en/': 'No Results'
    },
  },
  markdown: {
    smartypants: true,
    renderer: {
      code(code, lang) {
        if (lang === "mermaid") {
          return (
            '<div class="mermaid">' + mermaid.render('mermaid-svg-' + num++, code) + "</div>"
          );
        }
        return this.origin.code.apply(this, arguments);
      },
    }
  },
  routerMode: 'history',
  tabs: {
    persist: true,      // default
    sync: true,      // default
    theme: 'classic', // default
    tabComments: true,      // default
    tabHeadings: true       // default
  },
  copyCode: {
    buttonText: {
      '/zh-cn/': '点击复制',
      '/ru/': 'Скопировать в буфер обмена',
      '/de-de/': 'Klicken Sie zum Kopieren',
      '/es/': 'Haga clic para copiar',
      '/en/': 'Copy to clipboard'
    },
    errorText: {
      '/zh-cn/': '错误',
      '/ru/': 'ошибка',
      '/': 'Error'
    },
    successText: {
      '/zh-cn/': '复制成功',
      '/ru/': 'Скопировано',
      '/de-de/': 'Kopiert',
      '/es/': 'Copiado',
      '/en/': 'Copied'
    }
  },
}
