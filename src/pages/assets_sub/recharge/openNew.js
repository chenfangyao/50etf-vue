




export function openView(txt){return plus.webview.create('./pay.html', 'pay', { 'titleNView': {  type: 'transparent', autoBackButton: true }, backButtonAutoControl:'close'},{txt})}
