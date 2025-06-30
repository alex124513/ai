FROM nvidia/cuda:12.2.0-base-ubuntu22.04

# 基礎系統環境
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    python3-pip \
    wget \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Python 連結
RUN ln -s /usr/bin/python3 /usr/bin/python && \
    python -m pip install --upgrade pip

# 安裝常用 AI 套件
RUN pip install \
    torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 && \
    pip install \
    transformers \
    datasets \
    accelerate \
    peft \
    huggingface_hub \
    sentencepiece \
    scikit-learn

# 預設工作目錄
WORKDIR /workspace
