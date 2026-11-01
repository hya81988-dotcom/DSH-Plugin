/** All host DOM knowledge lives here. Modify this file, then `npm run build`.
 * selectors are alternatives, not an assumption that every DSH release uses
 * the same DOM. cssModules resolves exported names from host stylesheets.
 */
export const DEFAULT_CONFIG = {
  enabled: true,
  transition: {
    enabled: false, // 界面主题包不播放动画；独立启动动画包会在构建时设为 true。
    prepareBeforeEndMs: 500,
    revealMs: 1200, // 与参考录屏接近的交叠淡出时长；提前等长启动，覆盖视频尾声。
    skipMs: 260,
    fallbackMs: 160,
    assetTimeoutMs: 8000,
    maxPlaybackMs: 25000,
    stalledTimeoutMs: 6000,
    // Measured in the supplied 1280 x 720 video; fractions of SOURCE pixels.
    rippleCenter: { x: 550 / 1280, y: 330 / 720 },
    objectFit: 'cover',
    revealStyle: 'fade', // 整幅动画淡出、下面的真实对话界面同步显现；可选 'ripple'。
    respectReducedMotion: true,
    sound: true, // 尝试原视频有声播放；策略拦截时改为静音并显示开启音效按钮。
    volume: 1,   // 0..1；1 保留原视频音量，不另加背景音乐。
    // Optional same-origin URLs override the bundled offline assets.
    videoUrl: null,
    backgroundUrl: null,
  },
  theme: { enabled: true, backgroundPosition: '58% 50%', showKnots: true, showScenery: true },
  adapter: {
    selectors: {
      app: ['[data-dsh-root]', '#root', '#app'],
      sidebar: ['[data-dsh-sidebar]', '[data-dsh-sidebar-surface]', 'aside[aria-label]', 'aside'],
      main: ['[data-dsh-chat]', 'main'],
      header: ['[data-dsh-chat-header]', 'main > header'],
      logo: ['[data-dsh-logo]', '[data-dsh-brand]'],
      brandRow: ['[data-dsh-brand-row]'],
      sidebarToggle: ['[data-dsh-sidebar-toggle]', 'button[aria-label="收起侧边栏"]', 'button[aria-label="展开侧边栏"]', 'button[aria-label="Collapse sidebar"]', 'button[aria-label="Expand sidebar"]'],
      composer: ['[data-dsh-composer]', 'form:has(textarea)', 'form:has([contenteditable="true"])'],
      input: ['textarea', '[contenteditable="true"][role="textbox"]'],
      message: ['[data-message-role]', '[data-role="assistant"]', '[data-role="user"]'],
      // Portaled dialogs are body children, not descendants of the chat area.
      // Only the card gets a fill; the full-screen modal/mask stays transparent.
      surface: ['[role="dialog"]', '[role="alertdialog"]', '[role="menu"]', '[data-dsh-file-card]', '[data-dsh-code-card]', '[data-dsh-surface]'],
      // Only theme decoration, never user message images or avatars.
      legacyDecor: ['[data-skin-chrome]', '[data-dsh-ornament]', '[data-dsh-character-art]'],
    },
    cssModules: {
      sidebar: [['ui-sidebar/SidebarRoot.module.css', 'root']],
      logo: [['ui-sidebar/SidebarRoot.module.css', 'brand']],
      brandRow: [['ui-sidebar/SidebarRoot.module.css', 'logoRow']],
      sidebarToggle: [['ui-sidebar/SidebarRoot.module.css', 'toggle']],
      main: [['ui-conversation/ConversationRoot.module.css', 'root'], ['ui-chat/ChatRoot.module.css', 'root']],
      composer: [['ui-conversation/InputBar.module.css', 'card'], ['ui-chat/InputBar.module.css', 'card']],
      message: [['ui-conversation/MessageItem.module.css', 'bubble'], ['ui-chat/MessageItem.module.css', 'bubble'], ['ui-conversation/AssistantMarkdown.module.css', 'body'], ['ui-chat/AssistantMarkdown.module.css', 'body']],
      header: [['ui-conversation/ConversationRoot.module.css', 'header'], ['ui-chat/ChatRoot.module.css', 'header']],
      surface: [
        ['ui-primitives/Modal.module.css', 'dialog'],
        ['ui-primitives/CodeCard.module.css', 'card'],
        ['ui-attachment/FileCard.module.css', 'card'],
        ['ui-primitives/MenuSurface.module.css', 'surface'],
        ['ui-primitives/Input.module.css', 'wrap'],
      ],
    },
    observeAttributes: ['class', 'data-plugin-css'],
  },
};
