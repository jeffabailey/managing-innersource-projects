# InnerSource Framework

This is markdown version of the InnerSource Framework poster.

## How to use this

### Install dependencies

```sh
brew install pandoc
```

### Build the poster

```sh
pandoc poster.md -o poster.pdf --pdf-engine=weasyprint -V geometry:landscape,a4paper,margin=1in
```
