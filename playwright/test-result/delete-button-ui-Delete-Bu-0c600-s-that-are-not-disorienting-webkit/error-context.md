# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Book Search App" [level=1] [ref=e5]
    - paragraph [ref=e6]: Search for books using Google Books API
  - main [ref=e7]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]: "Search by:"
        - combobox "Search by:" [ref=e13] [cursor=pointer]:
          - option "General Search" [selected]
          - option "Title"
          - option "Author"
          - option "ISBN"
      - generic [ref=e14]:
        - textbox "Enter your search query..." [active] [ref=e15]: animation test
        - button "Search" [ref=e16] [cursor=pointer]
        - button "Delete search" [ref=e17] [cursor=pointer]: Delete
```