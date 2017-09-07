---
layout: post
title: "TIL: Running Tests in VS Code"
date: 2017-09-07 15:52:30
categories: TIL
---

Since I've started using [Visual Studio Code](https://code.visualstudio.com/) (still seems weird to say that...) I've been looking for a way to easily run tests. Today I learned how you can easily [run tasks](https://code.visualstudio.com/docs/editor/tasks) in Code in the integrated terminal.

![](https://cl.ly/mNhV/Screen%20Shot%202017-09-07%20at%204.16.10%20PM.png)

## Configure Task

First, choose the **Tasks** → **Configure Tasks** menu. Code has a bunch of pre-built ones, but we just want to run a shell command so choose **Others**.

Use a configuration task like the following:

```js
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "taskName": "Run tests",
      "type": "shell",
      "command": "rails",
      "args": [
        "${relativeFile}"
      ],
      "group": "test",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

See that `${relativeFile}` bit? There's a bunch of variables you can put there:

* `${workspaceRoot}` the path of the folder opened in VS Code
* `${workspaceRootFolderName}` the name of the folder opened in VS Code without any slashes (/)
* `${file}` the current opened file
* `${relativeFile}` the current opened file relative to workspaceRoot
* `${fileBasename}` the current opened file's basename
* `${fileBasenameNoExtension}` the current opened file's basename without the extension
* `${fileDirname}` the current opened file's dirname
* `${fileExtname}` the current opened file's extension
* `${cwd}` the task runner's current working directory on startup
* `${lineNumber}` the current selected line number in the active file

Imagine setting up tasks to run your entire suite (e.g. `rails test`), the current file (`rails test ${relativeFile}`), the current line (`rails test ${relativeFile}:${lineNumber}`), etc.

Now running this task (with ⌘R and selecting the task) will popup the integrated terminal and run the task.

Bonus tip: ⌘-Click files and files with line numbers to jump directly to that file and line in Code. Super handy.

## Keyboard Shortcut

Now that we have our task, we can setu a keyboard shortcut to run it easily. I setup ⌘R to run tests like so:

```js
{
  "key": "cmd+r",
  "command": "workbench.action.tasks.runTask",
  "args": "Run tests",
}
```
