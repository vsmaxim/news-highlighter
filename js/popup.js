function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function appendArticle({ title, source, publish_date}) {
    const container = document.getElementById("article-container");
    const hostname = new URL(source).hostname;

    container.appendChild(createElementFromHTML(`
    <div class="related-articles__article article">
        <div class="article__heading"><a href="${source}" target="_blank">${title}</a></div>
        <div class="article__footer">
            <span class="article__provider">Источник: ${hostname}</span>
            <span class="article__date">${publish_date}</span>
        </div>
    </div>
    `));
}

function setClusterInfo(cluster) {
    console.log(cluster);
    const { title, article_set } = cluster;
    document.getElementById("heading").innerText = title;
    article_set.forEach(article => appendArticle(article));
}

document.addEventListener("DOMContentLoaded", () => chrome.runtime.sendMessage({query: "fetchCluster"}, () => {
    chrome.storage.sync.get(['cluster'], (values) => setClusterInfo(values.cluster));
}));
