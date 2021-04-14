# Development process guidelines
## General
- Project timeline 24.03.2021 - 21.05.2021
- Sprints
    - 29.03.2021. - 09.04. - Sprint 1
    - 12.04. - 23.04. - Sprint-2
    - 26.04. - 07.05. - Sprint-3
    - 10.05. - 21.05. - Sprint-4
    - 21.05. - (Final Presentation)
- Primary teamwork schedule(Suggested)
    - Day-1
        - Previous sprint demo 09:30 - 10:30
        - Previous sprint retrospective 10.30 - 11:15
        - Sprint planning 11:45 - 12:30
        - Joint development time 12:30 - 15:00
    - Rest
        - Individual development time as per allowed by personal schedules
## Git branching strategy:
- master
    - "Production" branch
    - Commits **must** only be merges from "dev" branch

- dev
    - Main development branch from which all development should branch out from
    - Commits **must** be merges from feature/bug/doc branches via pull requests
- feature/*
    - Feature branches
    - Commits **must** include commit msg with prefix `feature/%feature name%: `
- bugfix/*
    - Bug fixing branches for existing features
    - Commits **must** include commit msg with prefix `bugfix/%feature name%: `
- doc/*
    - Documentation
    - Commits **must** include commit msg with prefix `doc/%documentation headline%: `

### Step-by-step example for starting on a new feature:
Make sure you're code is up-to-date, and then branch out from dev:
```
$ git pull --all
$ git checkout dev
$ git checkout -b feature/%my_awesome_new_feature%
```
Once done, or *at least* once a day when you've been coding, add & commit:
```
$ git add %files_that_you_added%
$ git commit -m "feature/%my_awesome_new_feature%: your commit msg here"
```

And push to remote. 1st time with:
```
$ git push --set-upstream origin feature/%my_awesome_new_feature%
```
Subsequent times go directly with:
```
$ git push
```
Finally, once you're done with coding and testing your feature, and have pushed them to remote, create a pull request on GitHub to begin merge of your feature branch back to **the dev branch**.  
See link for more detailed instructions:  
https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request
