find . -name "*.json" -not -path "./node_modules/*" -print0 | while IFS= read -d '' -r filename; do
    if ! jq . "$filename" >/dev/null 2>&1; then
        echo "$filename is invalid"
    fi
done