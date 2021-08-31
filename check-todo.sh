#!/bin/sh
branch=$(git symbolic-ref --short HEAD)
fileListDiffFromMaster=()
fileListDiffFromPrev=()
fileListDiffFromMaster+=($(git diff master $branch --name-only --stat))
fileListDiffFromPrev+=($(git diff --name-only --cached))
# 数组合并
fileList=(${fileListDiffFromMaster[@]} ${fileListDiffFromPrev[*]})
# 数组去重
fileList=($(awk -v RS=' ' '!a[$1]++' <<<${fileList[@]}))

todos=()
for file in ${fileList[@]}; do
	a=$(grep -c 'TODO:' $file)
	if [ $a != 0 ]; then
		todo=$(grep -o -E 'TODO:[[:space:]]*[[:graph:]]+' $file)
		text=${todo// /}
		todos[${#todos[@]}]=$text
	fi
done
# 获取数组的长度
fileIncludeTodoLen=${#todos[@]}
i=0
if [ $fileIncludeTodoLen -gt 0 ]; then
	# 输出带有颜色的文字
	echo '\033[31m 存在TODO \033[0m'
	# 数组循环
	for todo in ${todos[@]}; 
	do
		# 变量在双引号之间
		echo "\033[31m ${todo} \033[0m"
		let i++
	done
exit 1
else
exit 0
fi
