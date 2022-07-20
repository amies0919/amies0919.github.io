let changeColor = document.getElementById("changeColor");

async function getCurrentTab () {
    let queryOptions = { active: true, currentWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}

changeColor.addEventListener('click', async()=>{
    let tab = await getCurrentTab()
    chrome.storage.sync.get("color", ({ color }) => {
        changeColor.style.backgroundColor = color
    })
    let color = await chrome.storage.sync.get("color")
    changeColor.style.backgroundColor = color
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function(giveColor){
            //改变当前页面的背景颜色
            document.body.style.backgroundColor = giveColor.color
        },
        args: [color]
    })

})
