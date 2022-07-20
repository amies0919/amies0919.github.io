let color = '#3aa757'
chrome.runtime.onInstalled.addListener(() => {
    console.log('插件已安装')
    chrome.storage.sync.set({ color })
    console.log('设置一个默认的颜色，默认颜色值为绿色 %cgreen', `color: ${color}`)
})
