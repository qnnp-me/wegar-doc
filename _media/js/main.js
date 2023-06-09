window.repo = 'https://github.com/qnnp-me/wegar'
window.$docsify = {
  logo: '_media/img/logo.512.png',
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
    window.docLastModified = dayjs(time).format('YYYY-MM-DD HH:mm')
    return window.docLastModified
  },
  notFoundPage: true,
  externalLinkTarget: '_blank',
  repo,
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
      data() {
        return {
          lastModified: window.docLastModified,
          label: ({
            'zh-cn': '本页更新时间:',
            'en': 'This page was last updated:',
          })[window.language],
          file: window.file,
          repo: window.repo,
          editText: ({
            'zh-cn': '帮助改进/编辑本页',
            'en': 'Edit on GitHub',
          })[window.language],
          editUrl: ({
            'zh-cn': 'https://github.com/qnnp-me/wegar-doc',
            'en': 'https://github.com/qnnp-me/wegar-doc',
          })[window.language],
        };
      },
      template: `
        <span class="modified">
          <span class="icon-app-nodate"></span> {{ label }} {{ lastModified }}.
          <a :href="\`\${editUrl}/blob/main\${file}\`" target="_blank" style="color: #ff6600">
            <span class="icon-mode_edit"></span> {{ editText }}
          </a>
        </span>
      `,
    },
    'v-footer': {
      data() {
        return {
          dayjs,
        }
      },
      template: `
        <div class="footer">
          <div class="left">
              <div class="copy-right">
                  <img src="/_media/img/logo.256.png" alt="Wegar" width="12">
                  &copy; {{ dayjs().format('YYYY') }}
                  <a href="https://qnnp.me" target="_blank">qnnp</a>.
              </div>
          </div>
          <div class="left">
              <v-last-modified/>
          </div>
        </div>
      `
    }
  },
  vueMounts: {
    '.v-footer': {
      template: `<v-footer/>`,
      data() {
        return {}
      },
    }
  },
  plugins: [
    (hook, vm) => {
      // Footer
      hook.beforeEach((content) => {
        window.file = vm.route.file
        window.language = window.location.pathname.split('/')[1] || 'zh-cn'
        return content + "<div class='v-footer'></div>";
      });
    },
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
