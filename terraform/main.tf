terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

# Connexion avec Docker Desktop (Kubernetes local)
provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

# 1. Création des Namespaces isolés
resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
  }
}

# resource "kubernetes_namespace" "argocd" {
#   metadata {
#     name = "argocd"
#   }
# }

# 2. Installation de Prometheus & Grafana via le gestionnaire Helm
resource "helm_release" "kube-prometheus" {
  name       = "prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  timeout    = 600
  
  # Configuration pour optimiser l'utilisation de la mémoire
  set {
    name  = "prometheus.prometheusSpec.resources.requests.memory"
    value = "400Mi"
  }
  set {
    name  = "grafana.resources.requests.memory"
    value = "100Mi"
  }
}