let issueListInJSONFormat = document.getElementById('issue-list').getAttribute('data')
let issuesArray = JSON.parse(issueListInJSONFormat);

let searchIssueForm = document.getElementById('search-issue-form');

searchIssueForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let titleLabelValue = searchIssueForm.querySelector('input[name="titleLabel"]').value;
    let descLabelValue = searchIssueForm.querySelector('input[name="descLabel"]').value;

    // let titleLabelValue = document.getElementById('titleLabel').value;
    // let descLabelValue = document.getElementById('descLabel').value;
    let searchedIssues = [];

    for (let issue of issuesArray) {
        if (issue.title == titleLabelValue || issue.description == descLabelValue) {
            if (!searchedIssues.includes(issue)) {
                searchedIssues.push(issue);
            }
        }
    };

    let searchIssueDiv = document.getElementById('search-issue-div');
    searchIssueDiv.innerHTML = '';
    searchedIssues.forEach(ele => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="card-header fw-bold">Title: ${ele.title}</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Author: ${ele.author}</li>
          <li class="list-group-item">
            Description: ${ele.description}
          </li>
          <li class="list-group-item">Labels: ${ele.labels}</li>
        </ul>
        `
        searchIssueDiv.append(div);
    });

    let searchIssueButton = document.getElementById('searchIssueButton');
    searchIssueButton.click();
});