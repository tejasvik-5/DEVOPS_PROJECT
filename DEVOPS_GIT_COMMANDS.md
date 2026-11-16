# DevOps Git Commands

## Git Rebase

Git rebase is used to replay the commits of a feature branch on top of the latest integration branch. It helps maintain a cleaner and more linear Git history.

### Rebase Workflow

```bash
git fetch origin
git rebase origin/tejasvi/scm
git push --force-with-lease origin <branch>