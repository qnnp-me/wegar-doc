ls -ahl
git ls-files | while read file; do touch -d $(git log -1 --format="@%ct" "$file") "$file"; done
ls -ahl
mkdir doc
cp -rfp _media en zh-cn _coverpage.md index.html _404.md README.md _common doc
