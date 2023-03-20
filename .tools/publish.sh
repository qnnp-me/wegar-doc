TAG="publish-$(date "+%y%m%d%H%M%S")"
printf "即将发布版本：%s，输入 yes 确认 任意键取消: " "$TAG"
read -r confirm
if [ "$confirm" = 'yes' ]; then
  git tag -a "$TAG" -m ''
  git push origin main --tags
else
  echo "取消发布"
fi
