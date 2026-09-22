---
title: Points de contrôle préalables
description: Exigences à réussir ou à échouer, avec responsable nommé, preuve consignée, date et décision datée par langue.
lang: fr
translation_key: facilitator-preflight
parent: Trousse d'animation
grand_parent: Français
nav_order: 1
covers:
  - scope-boundaries
  - no-installation-in-class
  - telemetry-disclosure
  - human-review-required
  - unrehearsed-proposal-notice
  - synthetic-data-only
---

# Points de contrôle préalables

Chaque exigence ci-dessous se réussit ou échoue. Un échec déplace la date de livraison au lieu d'être absorbé le jour même.

Une liste sans responsable nommé, sans preuve consignée et sans décision datée n'est pas un point de contrôle : le tableau porte donc les quatre colonnes, et aucune ne peut se contenter d'une fonction. Une cellule de responsable qui nomme un poste plutôt qu'une personne correspond à une exigence encore ouverte.

> [!WARNING]
> Une déclaration sur l'honneur ne referme aucune exigence. Une preuve est un élément rapporté : un numéro de version, une transcription, une autorisation signée, un chemin de répertoire déposé ou un temps chronométré. Une case cochée par quelqu'un au sujet de son propre poste est exactement ce qui amène quatre personnes à découvrir le jour même que la politique de leur organisation bloque l'application.

## Tableau des exigences

Une exigence marquée bloquante ne s'échange pas contre un pourcentage de postes vérifiés. Si l'une d'elles reste ouverte, la décision est négative, quel que soit le pourcentage atteint.

| Exigence | Responsable | Preuve | Date | Résultat |
| --- | --- | --- | --- | --- |
| G01 Canevas de référence construit, révisé, répété et déposé sur l'image de poste sous forme de répertoire copiable | Responsable du contenu (nom exigé) | Chemin de dépôt sur l'image et compte rendu de révision décrit à la page du canevas de référence | Non fixée | Non atteinte, bloquante |
| G02 Deux répétitions chronométrées par langue sur l'image de poste des personnes participantes, programme calé sur la plus lente | Responsable de la livraison (nom exigé) | Temps chronométré par temps fort pour chacune des quatre répétitions, relevé sur la décomposition de la section 3, la plus lente étant désignée | Non fixée | Non atteinte, bloquante |
| G03 Réseau et mandataire du lieu vérifiés sur l'image de poste à l'effectif complet, y compris l'inspection TLS et la liste d'autorisation de pare-feu documentée | Contact réseau du lieu (nom exigé) | Transcription obtenue sur le réseau réellement utilisé, à une simultanéité réaliste et non sur un seul poste branché à un réseau invité | Non fixée | Non atteinte, bloquante |
| G04 Budget de crédits par poste approuvé, relevé d'utilisation capté pour chaque poste, repli en cas de limitation répété | Commanditaire (nom exigé) | Budget approuvé par poste, un relevé d'utilisation par poste, et un compte rendu de répétition du repli | Non fixée | Non atteinte, bloquante |
| G05 Formule et disponibilité des modèles confirmées pour chaque poste, y compris toute personne sur une formule gratuite | Responsable de la livraison (nom exigé) | Confirmation de la formule et du modèle par poste. Le choix de modèle est démontré par l'animation et n'est jamais exigé d'une personne apprenante | Non fixée | Non atteinte |
| G06 Politique d'entreprise vérifiée par poste sur le compte réellement utilisé, séparément de la formule | Contact informatique de la cliente ou du client (nom exigé) | Résultat de la politique relevé par poste sur le compte de connexion prévu. La politique d'organisation peut bloquer l'application pour un compte restreint indépendamment de la formule, et ce blocage ne se contourne ni localement ni pendant la séance | Non fixée | Non atteinte, bloquante |
| G07 Version de l'application, système d'exploitation et architecture confirmés par poste, Linux étant pris en charge en AppImage x64 seulement | Responsable de l'image de poste (nom exigé) | Version, système et architecture rapportés par poste et comparés au minimum fixé en G08 | Non fixée | Non atteinte |
| G08 Version minimale de l'application fixée, les versions antérieures étant refusées sur l'image de poste | Responsable de l'image de poste (nom exigé) | La version minimale n'est pas encore fixée. Reprenez la version utilisée lors de la première répétition réussie en G02, inscrivez-la dans cette cellule et refusez toute version antérieure. Tant que la cellule ne porte aucun numéro, l'exigence est en échec | Non fixée | Non atteinte, bloquante |
| G09 Nouvelle vérification de la version du produit et de ses libellés dans les sept jours précédant la livraison | Responsable du contenu (nom exigé) | Relecture datée de la documentation officielle de l'application, tout libellé renommé étant reporté dans le matériel. L'application publie presque chaque jour : une vérification faite un mois plus tôt est périmée | Non fixée | Non atteinte |
| G10 Prérequis d'exécution installés à l'avance, aucune installation en salle sur le chemin critique | Responsable de l'image de poste (nom exigé) | Liste des prérequis installée et vérifiée sur l'image. Une extension générée comporte un fichier package.json et un point d'entrée, et résout ses outils depuis la variable PATH : un environnement d'exécution fonctionnel relève donc du préalable | Non fixée | Non atteinte |
| G11 Aucune compétence héritée, aucun serveur MCP et aucun outil configuré ne modifie le comportement de l'agent sur l'image de poste | Responsable de l'image de poste (nom exigé) | Inventaire des compétences, serveurs MCP et outils configurés sur l'image, chacun étant retiré ou justifié par écrit. La formulation d'une invite n'est pas un contrôle de sécurité : le texte d'une invite d'atelier ne constitue donc pas une preuve pour cette exigence | Non fixée | Non atteinte, bloquante |
| G12 Avis sur la télémétrie et le traitement des données transmis par écrit aux personnes participantes et au commanditaire | Contact chez le commanditaire (nom exigé) | L'avis envoyé, ses destinataires et la date d'envoi. Les données de conversation peuvent être collectées, ce qui relève de la divulgation et non de la formalité | Non fixée | Non atteinte, bloquante |
| G13 Autorisation écrite au dossier pour exécuter du code généré par IA sur des appareils gérés, avec une personne autorisatrice nommée par organisation et une marche à suivre en cas d'incident | Personne autorisatrice chez la cliente ou le client (nom exigé) | Autorisation signée par organisation participante, contact nommé, et gestes à poser si une solution de protection met une extension générée en quarantaine pendant la séance | Non fixée | Non atteinte, bloquante |
| G14 Taux d'encadrement et plafond de participation convenus et appliqués à l'inscription, mode développement du canevas répété comme levier de reprise | Responsable de la livraison (nom exigé) | Plafond convenu, nombre de renforts confirmé et compte rendu de répétition du levier de reprise. Le plafond et le nombre de renforts restent ouverts en OD-03 jusqu'à ce qu'une personne nommée les arbitre | Non fixée | Non atteinte |

## Preuves fournies par les personnes participantes

Les exigences G05 à G11 se vérifient poste par poste. Chaque personne produit donc ses preuves sur le poste qu'elle utilisera, au moins 48 heures avant la séance :

1. Ouvrir une session dans l'application sur le poste d'atelier et confirmer que le compte n'est pas bloqué par la politique de l'organisation.
2. Relever la consommation et transmettre le résultat.
3. Créer un dossier jetable, à l'écart de tout travail réel, lancer une création de canevas minimale et confirmer l'affichage d'un panneau.
4. Transmettre en texte la version de l'application, le système d'exploitation et l'architecture.

Toute personne qui ne complète pas les quatre gestes compte comme poste non vérifié pour le seuil ci-dessous.

## Seuil décisionnel

Une signature datée sans règle énoncée ne constitue pas une décision. La règle est publiée ici pour que les mêmes nombres s'appliquent quelle que soit la personne qui signe.

* 80 pour cent de postes vérifiés ou plus : la séance se tient telle que conçue.
* De 60 à moins de 80 pour cent : la séance se tient à portée réduite. Basculez le groupe vers le canevas de référence dès le premier déclencheur d'abandon plutôt qu'au second, et retirez le point de contrôle de réouverture de la section 5.
* Moins de 60 pour cent : la séance est reportée.
* Une seule exigence bloquante ouverte : décision négative, quel que soit le pourcentage.

Prenez la décision à J-2 et communiquez-la dans les deux cas, y compris lorsque la réponse est que la séance se tient. Consigner une règle différente est permis ; n'en consigner aucune ne l'est pas. Si un autre seuil est retenu, inscrivez-le dans cette section avec sa justification avant la décision, jamais après.

## Décision, une par langue

L'anglais et le français sont deux produits validés séparément. Une répétition anglaise réussie n'apprend rien sur le parcours français, jamais observé à ce jour et porteur du risque le plus élevé. Une réussite en anglais n'autorise pas la livraison en français.

| Langue | Postes vérifiés | Tranche appliquée | Exigences bloquantes ouvertes | Décidée par | Date | Décision |
| --- | --- | --- | --- | --- | --- | --- |
| Anglais | Non consigné | Aucune | G01, G02, G03, G04, G06, G08, G11, G12, G13 | Nom exigé | Non fixée | Négative |
| Français | Non consigné | Aucune | G01, G02, G03, G04, G06, G08, G11, G12, G13 | Nom exigé | Non fixée | Négative |

Répétez d'abord en français. Si le parcours français tient, le parcours anglais tiendra presque certainement ; l'inverse n'est pas vrai.

## Communications aux personnes participantes

Les exigences ci-dessus ne se referment que si les demandes partent à temps.

| Moment | Message | Objet |
| --- | --- | --- |
| J-14 | Prérequis, exigences de poste et version minimale fixée de l'application | Laisse à la personne responsable de l'image le temps d'agir sur G07, G08 et G10 |
| J-7 | La demande de preuves ci-dessus, avec un contact nommé et une date de retour | Produit les preuves par poste pour G05 à G11 |
| J-2 | La décision, envoyée quel qu'en soit le sens | Referme la décision ci-dessus |
| J-1 | Logistique, avec la mention que seules des données fictives sont admises | Porte la limite de données jusque dans la salle |
