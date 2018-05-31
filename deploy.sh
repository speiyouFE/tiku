#!/usr/bin/env sh
set -e
# build
echo "\033[35m 开始编译... \033[0m"
npm run build
echo ""
echo "\033[32m 编译完成... \033[0m"
echo ""

cd ./wwwroot

echo ""
echo "\033[35m 开始部署... \033[0m"
echo ""
# 如果是发布到自定义域名
echo 'chn-paper.sealui.com' > CNAME
git init
git add -A
git commit -m '🌴 🍋'
git push -f https://github.com/speiyouFE/tiku.git master:gh-pages
echo ""
echo "\033[32m 部署完成... \033[0m"
cd -
echo ""
