let issueListInJSONFormat1 = document.getElementById('issue-list').getAttribute('data');
let issuesArray1 = JSON.parse(issueListInJSONFormat);

let filterIssueForm = document.getElementById('filter-issue-form');

filterIssueForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let projectLabels = filterIssueForm.querySelectorAll('input[type=checkbox][name=projectLabels]:checked');
    let labelsList = [];
    for (let i = 0; i < projectLabels.length; i++) {
        labelsList.push(projectLabels[i].value);
    }

    let author = filterIssueForm.querySelector('input[type=radio][name=author]:checked').value;

    let filteredIssues = [];
    issuesArray1.map((issue) => {
        if (author == issue.author) {
            if (!filteredIssues.includes(issue)) {
                filteredIssues.push(issue);
            }
        }
        labelsList.map((label) => {
            if (issue.labels.includes(label)) {
                if (!filteredIssues.includes(issue)) {
                    filteredIssues.push(issue);
                }
            }
        });
    });

    let filterIssueDiv = document.getElementById('filter-issue-div');
    filterIssueDiv.innerHTML = '';
    filteredIssues.forEach(ele => {
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
        filterIssueDiv.append(div);
    });

    let filterIssueButton = document.getElementById('filterIssueButton');
    filterIssueButton.click();
});