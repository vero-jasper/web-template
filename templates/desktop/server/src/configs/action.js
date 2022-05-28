/**
 *  === action config ===
 *  业务代码配置
 *
 *  created at: Tue Jul 24 2018 20:35:00 GMT+0800 (CST)
 */

export default {

  // 这是默认是 action 项目配置

  defaultAction: {
    // csrf 作用是判断来访者身份，如果是 false 不会判断
    // 默认操作是，如果是 post, put, delete 操作，并且 来访者 域名的根域名和
    // 当前页面域名的根域名不通，则会拒绝，如果是 ip 访问，来访者和页面的 ip 不同则会拒绝
    // 如果 csrf 为 字符串 或者 字符串 数组，则相当于设置白名单，白名单中的会被认可
    // 白名单中请填写根域名 或者 ip
    // csrf: false,
    // csrf: ['other-domain.com'],

    // 默认 action 项，定义了页面登录等功能
    // 是否 login 是业务配置，如果不需要则 needLogin 为 false 即可
    needLogin: true,

    // 如果 beforeHandler return false 则不会触发 handler
    // 记得在 beforeHandler 中 不要出现停滞的状态 真不行就抛异常
    async beforeHandler (ctx) {
      // 如果 needLogin 为 maybe,
      // 则如果登陆则将用户信息附属到 user 变量中
      // 如果没有登陆则 user 变量数据为空，但是不会跳转登陆
      if (this.needLogin === 'maybe') {
        const user = ctx.request.user = ctx.user =
          await ctx.request.checkLogin({redirectLogin: false})
        return
      }

      // 如果 needLogin 为 true
      // 则如果登陆则将用户信息附属到 user 变量中
      // 如果没有登陆自动跳转登陆页面
      if (this.needLogin) {
        const user = ctx.request.user = ctx.user =
          await ctx.request.checkLogin()
        if (!user) return false
      }

      // 如果 needLogin 为 false
      // 则不检测登陆状态
    },

    // 在此处处理 所有业务逻辑
    async handler (ctx) {
      ctx.response.notFound('还没有定义action')
    }
  }
}

// 下面的特定环境可以深度合并到上面的默认环境
// 线上环境是上面的默认环境，不要乱改哦

// 开发环境配置
export const development = {}
// 测试环境配置
export const testing = {}