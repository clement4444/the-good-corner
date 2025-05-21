dev:
	docker-compose -f compose.yaml up -d --build

stop:
	docker-compose -f compose.yaml down
	@echo "Tout les conteneurs sont stoppés"

clean:
	docker system prune -a --volumes
	@echo "Tout les truc inutiles sont supprimés"

git:
	@git status
	@read -p "Voulez vous commit ses ficher ? (y/n) " reponse; \
	if [ "$$reponse" = "y" ]; then \
		git add .; \
		read -p "quelle est le nom du commit ?" message; \
		git commit -m "$$message"; \
		branch=$$(git rev-parse --abbrev-ref HEAD); \
		git push origin $$branch; \
	else \
		echo "Commande annulé"; \
	fi

help:
	@echo "dev : Lance le projet en mode dev"
	@echo "stop : Stop le projet"
	@echo "clean : Supprime les conteneurs et images inutiles du projet"
	@echo "git : Ajoute, commit et push les fichiers modifiés"
	@echo "help : Affiche la liste des commandes disponibles"