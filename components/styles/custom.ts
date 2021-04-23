import { css } from 'styled-components';

export default css`

  body {
    font-family: 'SF Pro TC', 'SF Pro Text', 'PingFang TC', 'Helvetica Neue',
      'Helvetica', 'Arial', 'Microsoft JhengHei', wf_SegoeUI, 'Segoe UI', Segoe,
      'Segoe WP', Tahoma, Verdana, Ubuntu, 'Bitstream Vera Sans', 'DejaVu Sans',
      Tahoma, 微軟正黑體, 'LiHei Pro', 'WenQuanYi Micro Hei',
      'Droid Sans Fallback', 'AR PL UMing TW', Roboto, 'Helvetica Neue',
      'Hiragino Maru Gothic ProN', メイリオ, 'ヒラギノ丸ゴ ProN W4', Meiryo,
      'Droid Sans', sans-serif;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background-color: #79ffe1;
    color: #000;
  }

  code,
  pre {
    font-family: Menlo, Monaco, Consolas, 'Courier New', 'Roboto Mono',
      monospace;
  }
`;
