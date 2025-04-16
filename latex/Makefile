.PHONY: clean all

all: poster.pdf

poster.pdf: poster.tex framework/commands.tex framework/environments.tex
	lualatex poster.tex
	lualatex poster.tex

clean:
	rm -f *.aux *.log *.nav *.out *.snm *.toc *.pdf 