# =====================================================================
# app.py — Dashboard Olist (Streamlit + Pandas + Plotly)
# Execute com:  streamlit run app.py
# =====================================================================
import streamlit as st
import pandas as pd
import plotly.express as px

# 1) Configuração da página — PRIMEIRA chamada Streamlit
st.set_page_config(page_title="Patrimônio dos Candidatos - AM 2026", layout="wide")


# 2) Carga de dados com cache (lê o CSV uma única vez)
@st.cache_data
def carregar_dados(caminho: str = "bens_am_por_candidato.csv") -> pd.DataFrame:
    df = pd.read_csv(
        caminho,
        encoding="utf-8-sig",
        dtype={"SQ_CANDIDATO": str},
    )
    return df


@st.cache_data
def para_download(dados: pd.DataFrame) -> bytes:
    return dados.to_csv(index=False).encode("utf-8")


try:
    df = carregar_dados()
except FileNotFoundError:
    st.error("Arquivo 'bens_am_por_candidato.csv' não encontrado na pasta do app.")
    st.stop()

st.title("Patrimônio dos Candidatos - AM 2026")
st.caption("Eleições 2026 · Dados públicos anonimizados")

# 3) Sidebar — filtros combinados
st.sidebar.header("🔎 Filtros")

cargos = sorted(df["DS_CARGO"].dropna().unique())
cargos_selecionados = st.sidebar.multiselect(
    "Cargo",
    options=cargos,
    default=cargos,
)

partidos = sorted(df["SG_PARTIDO"].dropna().unique())
partidos_selecionados = st.sidebar.multiselect(
    "Partido",
    options=partidos,
    default=partidos,
)

generos = sorted(df["DS_GENERO"].dropna().unique())
genero_selecionado = st.sidebar.radio(
    "Gênero",
    options=["Todos"] + generos,
    index=0,
)

patrimonio_min = st.sidebar.slider(
    "Patrimônio mínimo (R$)",
    min_value=0,
    max_value=int(df["PATRIMONIO_TOTAL"].max()),
    value=0,
    step=10_000,
)

# Aplicando os filtros ao DataFrame
mask = (
    df["DS_CARGO"].isin(cargos_selecionados)
    & df["SG_PARTIDO"].isin(partidos_selecionados)
    & (df["PATRIMONIO_TOTAL"] >= patrimonio_min)
)
dff = df[mask]

if genero_selecionado != "Todos":
    dff = dff[dff["DS_GENERO"] == genero_selecionado]

if dff.empty:
    st.warning(
        "Nenhum candidato corresponde aos filtros selecionados. Ajuste a seleção."
    )
    st.stop()

st.sidebar.markdown(f"**{len(dff)}** candidatos no recorte atual")

if dff.empty:
    st.warning("Nenhum pedido corresponde aos filtros. Ajuste a seleção.")
    st.stop()


# 4) KPIs com delta real (últimos 90d vs. 90d anteriores)
total_declarado = dff["PATRIMONIO_TOTAL"].sum()
n_candidatos = dff["SQ_CANDIDATO"].nunique()
patrimonio_medio = dff["PATRIMONIO_TOTAL"].mean() if n_candidatos > 0 else 0
patrimonio_mediano = dff["PATRIMONIO_TOTAL"].median() if n_candidatos > 0 else 0

# Média geral (base completa, sem filtro) usada para calcular o delta
media_geral = df["PATRIMONIO_TOTAL"].mean()
delta_medio = patrimonio_medio - media_geral

col1, col2, col3, col4 = st.columns(4)

col1.metric(
    "Total declarado",
    f"R$ {total_declarado:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
)

col2.metric(
    "Nº de candidatos",
    f"{n_candidatos}",
)

col3.metric(
    "Patrimônio médio (recorte)",
    f"R$ {patrimonio_medio:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
    delta=f"R$ {delta_medio:,.2f}".replace(",", "X")
    .replace(".", ",")
    .replace("X", "."),
    help="Diferença entre o patrimônio médio do recorte filtrado e a média geral da base completa.",
)

col4.metric(
    "Patrimônio mediano (recorte)",
    f"R$ {patrimonio_mediano:,.2f}".replace(",", "X")
    .replace(".", ",")
    .replace("X", "."),
)

st.divider()


# 5) Gráficos em abas
tab1, tab2, tab3 = st.tabs(["Por cargo", "Por partido", "Distribuição / Ranking"])

with tab1:
    st.subheader("Patrimônio mediano por cargo")
    if not dff.empty:
        patrimonio_cargo = (
            dff.groupby("DS_CARGO")["PATRIMONIO_TOTAL"]
            .median()
            .sort_values(ascending=False)
            .reset_index()
        )
        fig_cargo = px.bar(
            patrimonio_cargo,
            x="DS_CARGO",
            y="PATRIMONIO_TOTAL",
            labels={"DS_CARGO": "Cargo", "PATRIMONIO_TOTAL": "Patrimônio mediano (R$)"},
        )
        fig_cargo.update_layout(xaxis_tickangle=-45)
        st.plotly_chart(fig_cargo, use_container_width=True)
    else:
        st.info("Nenhum dado para os filtros selecionados.")

with tab2:
    st.subheader("Patrimônio mediano por partido")
    if not dff.empty:
        patrimonio_partido = (
            dff.groupby("SG_PARTIDO")["PATRIMONIO_TOTAL"]
            .median()
            .sort_values(ascending=False)
            .reset_index()
        )
        fig_partido = px.bar(
            patrimonio_partido,
            x="SG_PARTIDO",
            y="PATRIMONIO_TOTAL",
            labels={
                "SG_PARTIDO": "Partido",
                "PATRIMONIO_TOTAL": "Patrimônio mediano (R$)",
            },
        )
        fig_partido.update_layout(xaxis_tickangle=-45)
        st.plotly_chart(fig_partido, use_container_width=True)
    else:
        st.info("Nenhum dado para os filtros selecionados.")

with tab3:
    col_a, col_b = st.columns(2)

    with col_a:
        st.subheader("Distribuição do patrimônio por gênero")
        if not dff.empty:
            fig_genero = px.box(
                dff,
                x="DS_GENERO",
                y="PATRIMONIO_TOTAL",
                labels={
                    "DS_GENERO": "Gênero",
                    "PATRIMONIO_TOTAL": "Patrimônio total (R$)",
                },
            )
            st.plotly_chart(fig_genero, use_container_width=True)
        else:
            st.info("Nenhum dado para os filtros selecionados.")

    with col_b:
        st.subheader("Top 10 maiores patrimônios")
        if not dff.empty:
            top10 = dff.sort_values("PATRIMONIO_TOTAL", ascending=False).head(10)
            fig_top10 = px.bar(
                top10,
                x="PATRIMONIO_TOTAL",
                y="NM_URNA_CANDIDATO",
                color="SG_PARTIDO",
                orientation="h",
                labels={
                    "PATRIMONIO_TOTAL": "Patrimônio total (R$)",
                    "NM_URNA_CANDIDATO": "Candidato",
                    "SG_PARTIDO": "Partido",
                },
            )
            fig_top10.update_layout(yaxis={"categoryorder": "total ascending"})
            st.plotly_chart(fig_top10, use_container_width=True)
        else:
            st.info("Nenhum dado para os filtros selecionados.")

st.divider()

# 6) Dados brutos (expander) + exportação do recorte filtrado

csv_filtrado = dff.to_csv(index=False, encoding="utf-8-sig")

st.download_button(
    label="Baixar recorte filtrado (CSV)",
    data=csv_filtrado,
    file_name="patrimonio_candidatos_filtrado.csv",
    mime="text/csv",
)

with st.expander("Ver tabela completa do recorte filtrado"):
    st.dataframe(dff, use_container_width=True)
