#!/bin/sh
branch=`git symbolic-ref --short HEAD`
# fileListDiffFromMaster=`git diff master \$branch --name-only --stat`
fileListDiffFromMaster=()
fileListDiffFromPrev=`git diff --name-only --cached`
fileList=(${fileListDiffFromMaster[@]} ${fileListDiffFromPrev[*]})
echo ${#fileList[@]}
fileList=($(awk -v RS=' ' '!a[$1]++' <<< ${fileList[@]}))
echo ${#fileList[@]}
arr=()
todos=()
# git diff master \$branch --name-only --stat
for file in $fileList
do  
    a=`grep -c 'TODO' \$file`
  if [ $a != 0 ]
    # if [ $file =~ 'TODO' ]
   then
  arr[${#arr[@]}]=`basename \$file`
  todos[${#todos[@]}]=`grep 'TODO\:[[:space:]]*[[:graph:]]\+' \$file`
   fi
done

fileIncludeTodoLen=${#arr[@]}             
i=0 
if [ $fileIncludeTodoLen -gt 0 ]
then
echo '\033[31m 存在TODO \033[0m'
for todo in ${todos[@]} 
do
pos=${arr[$i]}
echo "\033[31m 存在\"${todo}\":位于\"${pos}\" \033[0m"
let i++
done
fi