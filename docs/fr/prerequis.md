---
title: Préalables
description: Ce qui doit être installé, autorisé et vérifié avant la séance, et les cas connus qui empêchent l'application de fonctionner le jour même.
lang: fr
translation_key: prerequisites
parent: Français
nav_order: 2
covers:
  - synthetic-data-only
  - no-endorsement
  - no-installation-in-class
  - scope-boundaries
  - telemetry-disclosure
  - human-review-required
---

# Préalables

Tout ce qui figure sur cette page se règle avant la séance, sur l'appareil que
vous utiliserez réellement. Aucune minute du chronomètre n'est consacrée à
l'installation, à la connexion ou à la mise en place d'un environnement
d'exécution.

Ce n'est pas une préférence d'animation. Une installation entamée en classe ne
se termine presque jamais dans le temps imparti, et le chemin de reprise prévu
n'est pas de la terminer : c'est de basculer la personne vers le canevas de
référence préparé.

## À faire au moins deux jours avant

Faites ces étapes vous-même, sur votre poste de travail habituel, et conservez
les résultats. Une case cochée sans preuve ne compte pas comme une vérification.

1. Installez l'application de bureau GitHub Copilot et ouvrez-la une fois.
2. Connectez-vous avec le compte GitHub que vous utiliserez le jour de la séance.
3. Vérifiez que Git est installé et accessible depuis votre terminal.
4. Vérifiez qu'un environnement d'exécution Node est présent et accessible depuis
   le chemin de recherche de votre terminal.
5. Ouvrez une session dans un dossier jetable et confirmez qu'un canevas peut
   être créé et qu'un panneau s'affiche.
6. Relevez la version de l'application, le système d'exploitation et
   l'architecture du processeur, et transmettez-les à l'équipe d'animation.

## Compte, forfait et accès aux modèles

Un compte GitHub est nécessaire. L'accès aux modèles provient d'un forfait
Copilot ou d'un fournisseur configuré. Deux cas méritent une attention
particulière avant la séance.

Le forfait Copilot Free ne propose que la sélection automatique de modèle. Toute
étape qui demanderait de choisir un modèle échoue sur ce forfait. L'atelier ne
vous demande donc jamais de choisir un modèle : si un choix de modèle est
montré, c'est par l'équipe d'animation, à titre de démonstration, et il est
présenté comme dépendant du forfait.

Pour les comptes Business et Enterprise, une politique d'application distincte
régit l'accès à l'application. Elle est activée par défaut, mais une politique
d'organisation peut bloquer l'application, y compris lorsque la restriction vise
un seul des comptes connectés sur l'appareil. Une politique définie au niveau de
l'entreprise ne peut pas être levée par l'organisation, et elle ne peut pas être
levée pendant la séance. Faites confirmer l'autorisation par la personne
responsable avant que l'invitation ne soit confirmée.

## Systèmes d'exploitation pris en charge

L'application est documentée pour Windows, macOS et Linux. Sous Linux, elle est
distribuée uniquement sous forme d'AppImage x64. Linux sur arm64 n'est donc pas
couvert : si votre poste est un Linux arm64, vous avez besoin d'un autre appareil
approuvé, et cette décision se prend avant le jour de la séance et non pendant.

## Réseau et serveurs mandataires

C'est la cause d'échec la plus probable pour une séance en entreprise ou en
organisme public, et c'est celle qui se découvre le plus tard.

Les serveurs mandataires utilisant `https://` ne sont pas pris en charge. Les
mandataires d'entreprise qui interceptent le trafic TLS sont explicitement
nommés parmi les causes d'échec. Un poste qui fonctionne sur un réseau invité
peut échouer sur le réseau de l'entreprise, et l'inverse se produit aussi.

La vérification doit donc porter sur le réseau et l'image de poste que les
personnes participantes utiliseront réellement, pas sur un réseau de
remplacement. Testez également la situation réelle de la salle : une vingtaine
de requêtes de génération envoyées dans la même fenêtre de deux minutes
constituent exactement le motif d'usage groupé que la limitation de débit vise.

## Coût et consommation

La facturation repose sur des crédits d'IA facturés au jeton. Un bloc de
génération de trente-cinq minutes multiplié par la taille du groupe représente
un coût réel. Un budget par place doit être approuvé par l'organisation
commanditaire, et un relevé de consommation de référence doit être pris pendant
la phase de vérification, pas pendant la séance.

## Traitement des données et journalisation

Le dépôt de l'application indique que des données de conversation peuvent être
collectées. Cet avis doit être transmis par écrit aux personnes participantes et
à l'organisation commanditaire avant la séance. Un artefact enregistré
localement ne prouve ni un traitement local, ni une région de traitement, ni une
durée de conservation, ni une garantie de résidence des données.

## Limites du contenu utilisé

Ces limites valent pour tout ce que vous mettez dans une session, y compris le
texte que vous saisissez vous-même dans le tableau.

* Données fictives uniquement. Aucune donnée opérationnelle, de défense, de
  citoyens, de personnel, propriétaire ou personnelle.
* Aucun dépôt réel, aucun journal réel, aucun billet, aucun agenda.
* Aucun logo d'organisation cliente. Les exemples d'organisations sont
  illustratifs et ne constituent ni une approbation, ni une preuve de conformité.
* Aucun service externe, aucun secret, aucun commit, aucun envoi distant, aucune
  demande de tirage, aucun déploiement.
* Une personne lit et accepte ce que l'agent produit. Rien sur cette page ne
  transfère cette responsabilité à un outil : la formulation d'une invite n'est
  pas un contrôle de sécurité, et les compétences héritées, les serveurs MCP et
  les approbations d'outils restent actifs dans votre session.

## Autorisation d'exécuter du code généré

Le canevas s'exécute au moment où il s'affiche. Sur un appareil géré, cela
suppose une autorisation écrite d'exécuter du code généré par l'IA, avec une
personne approbatrice nommée pour chaque organisation. Prévoyez aussi la marche
à suivre si un outil de protection du poste met l'extension générée en
quarantaine pendant la séance, et la personne à prévenir.

## Ce qui vous sera fourni

Vous n'avez rien à préparer sur le plan du contenu. Le jeu de données fictif du
tableau de tâches et le canevas de référence de reprise sont fournis par
l'équipe d'animation et déposés localement sur l'image de poste, sous forme de
répertoire copiable plutôt que de captures d'écran.

## Seuil de décision avant la séance

La vérification n'est pas une formalité : elle porte une décision. Si moins de
soixante pour cent des places sont vérifiées vingt-quatre heures avant la
séance, la séance est reportée. Entre soixante et quatre-vingts pour cent, la
portée est réduite. Au-delà de quatre-vingts pour cent, la séance a lieu comme
prévu.

## Étape suivante

Une fois ces points réglés, lisez les
[Ateliers]({{ '/fr/labs/' | relative_url }}) pour savoir quelles décisions vous
seront demandées pendant la séance.
