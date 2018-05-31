#!/usr/bin/env sh

set -e
rm -rf ./wwwroot
echo "\033[35m 开始提交代码 \033[0m"
git add -A
git commit -m "🍑 🌴 🍋 ==> $(date +%F) $(date +%H:%M:%S)"
git origin master
echo ""
echo "\033[32m ✔ 代码提交完成... \033[0m"
echo ""
# 编译文件
echo "\033[36m 开始编译... \033[0m"
npm run build
echo ""
echo "\033[32m ✔ 编译完成... \033[0m"
echo ""

cd ./wwwroot

echo ""
echo "\033[33m 开始部署... \033[0m"
echo ""
# 如果是发布到自定义域名
echo 'chn-paper.sealui.com' > CNAME
git init
git add -A
git commit -m '🌴 🍋'
git push -f https://github.com/speiyouFE/tiku.git master:gh-pages
echo ""
echo "\033[32m ✔ 部署完成... \033[0m"
echo "========================================"
echo ""
echo "\033[32m 访问地址： http://chn-paper.sealui.com/ \033[0m"
echo ""
echo "========================================"
cd -
