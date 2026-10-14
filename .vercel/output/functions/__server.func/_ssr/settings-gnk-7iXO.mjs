import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { E as ErrorBoundary, c as cn, I as Input, d as Button, T as Textarea, C as Card, f as CardHeader, g as CardTitle, h as CardDescription, e as CardContent } from "./router-DONcpGkq.mjs";
import { L as Label } from "./label-nYamNITy.mjs";
import { S as Switch } from "./switch-Dj_mi93B.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C6am6R5Y.mjs";
import { i as instance } from "../_libs/i18next.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent } from "./sheet-DBHRoVkj.mjs";
import { r as Search, a6 as Menu, a7 as Building2, an as CalendarDays, a2 as Globe, ao as Wallet, a0 as CreditCard, U as Users, ap as Bell, i as Shield, aq as Database, ar as Camera, L as LoaderCircle, am as Copy, a5 as LogOut, as as Download, k as CircleCheck, at as Upload, T as Trash2, au as ExternalLink } from "../_libs/lucide-react.mjs";
import { u as useTranslation, i as initReactI18next } from "../_libs/react-i18next.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
const admin$2 = { "audit_log": "Auditoria", "customers": "Clientes", "licenses": "Licenças", "subtitle": "Administração do SaaS.", "title": "Painel Master" };
const agenda$2 = { "actions": { "cancel": "Cancelar", "complete": "Concluir", "edit": "Editar", "remove": "Remover", "start": "Iniciar", "whatsapp": "WhatsApp" }, "aria": { "current_time": "Horário atual", "drag_reorder": "Arrastar para reordenar", "next_day": "Próximo dia", "prev_day": "Dia anterior" }, "back_today": "Voltar para hoje", "badges": { "new": "Novo", "next": "Próximo" }, "block": { "break": "Pausa", "generic": "Bloqueio", "vacation": "Férias" }, "cancel_dialog": { "back": "Voltar", "body": "O horário será marcado como cancelado na sua agenda.", "confirm": "Cancelar horário", "title": "Cancelar horário?" }, "cancelled_success": "Agendamento cancelado", "client_avulso": "Cliente avulso", "create_appointment": "Criar agendamento", "duration_min": "{{count}} min", "edit_slot": "Editar horário", "empty": "Nenhum atendimento neste período.", "empty_body": "Nenhum atendimento para este dia.", "empty_title": "Agenda livre", "load_error": "Erro ao carregar agenda", "month": "Mês", "new_appointment": "Novo agendamento", "new_slot": "Novo horário", "remove_dialog": { "body": "Este agendamento será removido permanentemente do histórico.", "cancel": "Cancelar", "confirm": "Remover", "title": "Remover registro?" }, "remove_error": "Erro ao remover", "removed_success": "Agendamento removido", "reorder_error": "Erro ao reordenar", "reorder_success": "Horários reordenados", "service_fallback": "Serviço", "started_success": "Atendimento iniciado", "stats": { "appointments": "Atendimentos", "client_fallback": "Cliente", "done_count": "{{count}} concluídos", "next": "Próximo", "next_none": "Nada em seguida", "revenue": "Faturamento", "revenue_hint": "Do dia (concluídos)", "waiting": "Aguardando", "waiting_hint": "Confirmar clientes" }, "status": { "cancelled": "Cancelado", "completed": "Concluído", "in_progress": "Em atendimento", "scheduled": "Aguardando" }, "subtitle": "Organize seus atendimentos.", "title": "Agenda", "today": "Hoje", "today_at": "Hoje · {{time}}", "update_error": "Erro ao atualizar", "week": "Semana" };
const clients$2 = { "actions": { "edit": "Editar", "remove": "Remover", "schedule": "Agendar", "view": "Ver detalhes", "whatsapp": "WhatsApp" }, "badges": { "inactive": "Inativo", "new": "Novo", "recurring": "Recorrente", "return": "Retornar" }, "clear_filters": "Limpar filtros", "clear_search": "Limpar busca", "delete_dialog": { "body": "O cliente e seu histórico serão removidos permanentemente.", "cancel": "Cancelar", "confirm": "Excluir", "title": "Excluir cliente?" }, "edit_client": "Editar cliente", "empty": "Nenhum cliente cadastrado ainda.", "empty_state": { "empty_body": "Cadastre seu primeiro cliente para começar.", "empty_title": "Sua base está vazia", "no_results_body": "Ajuste a busca ou os filtros ativos.", "no_results_title": "Nenhum cliente encontrado" }, "filters": { "active": "Ativos", "all": "Todos", "inactive": "Inativos", "new": "Novos", "recurring": "Recorrentes", "return": "Retornar", "vip": "VIP" }, "info": { "last": "Última: {{date}}", "never": "Nunca visitou", "next": "Próxima: {{date}}" }, "load_error": "Erro ao carregar clientes", "metrics": { "avg_ticket": "Ticket médio", "total_spent": "Total gasto", "visits": "Visitas" }, "new_client": "Novo cliente", "register": "Cadastrar cliente", "remove_error": "Erro ao remover cliente", "removed": "Cliente removido", "search_placeholder": "Buscar por nome ou telefone...", "stats": { "active": "Ativos", "active_hint": "Visita nos últimos 60 dias", "retention": "Retenção", "retention_hint": "{{count}} inativos", "total": "Total", "total_hint": "Base cadastrada", "vip": "VIP", "vip_hint": "Com assinatura ativa" }, "subtitle": "Seu relacionamento em um só lugar.", "title": "Clientes" };
const common$2 = { "actions": "Ações", "add": "Adicionar", "authenticating": "Autenticando...", "back": "Voltar", "cancel": "Cancelar", "close": "Fechar", "confirm": "Confirmar", "delete": "Excluir", "edit": "Editar", "error_generic": "Ocorreu um erro. Tente novamente.", "goodbye": "Até logo!", "loading": "Carregando...", "loading_profile": "Carregando perfil...", "logout_error": "Erro ao sair", "new": "Novo", "no": "Não", "open": "Abrir", "save": "Salvar", "save_changes": "Salvar alterações", "saving": "Salvando", "search": "Buscar", "session_expired": "Sua sessão expirou ou é inválida.", "view_all": "Ver todos", "yes": "Sim" };
const countries$2 = { "BR": "Brasil", "ES": "Espanha", "US": "Estados Unidos" };
const dashboard$2 = { "appointments_today": "{{count}} atendimento", "appointments_today_other": "{{count}} atendimentos", "average_ticket": "Ticket médio", "avg_ticket_base": "Base de {{count}} atend.", "clients_at_risk": "Clientes em risco", "clients_at_risk_hint": "Precisam de atenção", "greeting": "Bem-vindo", "insights_body": "A Corte Certo AI analisa seu movimento e sugere ações concretas para elevar seu faturamento.", "insights_cta": "Ver insights", "insights_title": "Cresça sua barbearia com dados", "inventory_alerts": "em alerta", "inventory_label": "Estoque", "monthly_goal": "Meta mensal", "next_appointment": "Próximo atendimento", "of_goal": "{{current}} de {{goal}}", "reports_link": "Relatórios", "revenue_today": "Faturamento hoje", "quick_actions": { "new_appointment": "Novo agendamento", "new_client": "Novo cliente", "new_sale": "Nova venda", "new_service": "Novo serviço" }, "smart_day": { "actions": { "confirm_clients": "Confirmar clientes", "open_agenda": "Abrir agenda", "register_sale": "Registrar venda", "view_stock": "Ver estoque" }, "items": { "appointments": "Atendimentos", "cancelled_today": "Cancelamentos hoje", "expected_revenue": "Previsão do dia", "low_stock": "Estoque baixo", "next_client": "Próximo cliente", "pending_confirmation": "Aguardando confirmação" }, "messages": { "busy_day": "Hoje será um dia movimentado. Mantenha o ritmo!", "cancelled": "Alguns cancelamentos hoje. Considere reabrir horários.", "empty_day": "Nenhum atendimento hoje. Ótimo momento para divulgar horários livres.", "full_day": "Seu dia está praticamente completo.", "low_stock": "Seu estoque precisa de atenção.", "ok": "Seu dia está sob controle. Bom trabalho!", "pending": "Você tem {{count}} cliente aguardando confirmação.", "pending_other": "Você tem {{count}} clientes aguardando confirmação." }, "title": "Resumo inteligente do dia" }, "subtitle": "Aqui está sua barbearia em tempo real.", "view_agenda": "Ver agenda", "week": "Semana", "work_mode": "Modo trabalho" };
const finance$2 = { "charts": { "evolution_subtitle": "Entradas x saídas por dia", "evolution_title": "Evolução do mês", "no_completed_services": "Sem serviços concluídos", "top_services_subtitle": "Maior faturamento no mês", "top_services_title": "Top serviços" }, "delete_dialog": { "body": "Esta ação remove o registro do seu fluxo de caixa permanentemente.", "cancel": "Cancelar", "confirm": "Excluir", "title": "Excluir lançamento?" }, "expenses": "Despesas", "filters": { "all": "Tudo", "month": "Mês", "today": "Hoje", "week": "Semana" }, "highlights": { "all_good": "Tudo em ordem.", "low_stock": "Estoque baixo", "no_products": "Sem produtos cadastrados.", "no_services": "Nenhum serviço concluído ainda", "products_subtitle": "Estoque baixo e maior potencial", "products_title": "Produtos", "service_line": "{{count}} atendimentos · ticket {{ticket}}", "services_subtitle": "Mais vendidos e maior ticket", "services_title": "Serviços em destaque", "top_potential": "Maior faturamento potencial" }, "kpi": { "avg_ticket": "Ticket médio", "expenses": "Despesas", "margin": "Margem {{value}}%", "month": "Mês", "profit": "Lucro estimado", "services": "Serviços", "services_hint": "Concluídos no mês", "today": "Hoje" }, "load_error": "Erro ao carregar financeiro", "movements": { "by_category": "Por categoria", "count": "{{count}} lançamentos no período", "empty_body": "Registre entradas e saídas para começar.", "empty_cta": "Lançar primeiro valor", "empty_title": "Sem movimentações no período", "fallback_label": "Lançamento", "no_data": "Sem dados.", "title": "Movimentações" }, "new_entry": "Nova movimentação", "profit": "Lucro", "remove_error": "Erro ao remover lançamento", "removed": "Lançamento removido", "revenue": "Receitas", "subtitle": "Entradas, saídas e resultado do mês.", "title": "Financeiro" };
const inventory$2 = { "aria": { "delete": "Excluir produto", "edit": "Editar produto" }, "delete_dialog": { "body": "Esta ação remove {{name}} permanentemente do estoque.", "cancel": "Cancelar", "confirm": "Excluir", "title": "Excluir produto?" }, "edit_product": "Editar produto", "empty": { "filtered_body": "Ajuste o filtro ou a busca.", "filtered_title": "Nada encontrado com esse filtro", "none_body": "Cadastre seus primeiros produtos para começar.", "none_title": "Nenhum produto cadastrado" }, "filters": { "all": "Todos", "healthy": "Saudável", "low": "Estoque baixo", "out": "Zerados" }, "form": { "cancel": "Cancelar", "create": "CADASTRAR", "current_stock_label": "Estoque Atual", "min_stock_label": "Mín. p/ Alerta", "name_label": "Nome do Produto", "name_placeholder": "Ex: Pomada Efeito Matte", "purchase_price_label": "Preço Compra (R$)", "save": "SALVAR", "selling_price_label": "Preço Venda (R$)", "sku_label": "SKU / Código", "sku_placeholder": "Opcional", "toast": { "created": "Produto cadastrado", "not_authenticated": "Usuário não autenticado", "save_error": "Erro ao salvar produto", "updated": "Produto atualizado" }, "validation": { "min_stock_min": "Mínimo não pode ser negativo", "name_min": "Nome deve ter pelo menos 2 caracteres", "purchase_min": "Preço de compra deve ser positivo", "selling_min": "Preço de venda deve ser positivo", "stock_min": "Estoque não pode ser negativo" } }, "kpi": { "low": "Estoque baixo", "profit": "Lucro potencial", "units": "Itens em estoque", "value": "Valor em estoque" }, "labels": { "margin": "Margem", "min_short": "mín", "sale": "Venda", "sku": "SKU", "units_short": "un" }, "load_error": "Erro ao carregar estoque", "low_stock": "Estoque baixo", "new_product": "Novo produto", "register_product": "Cadastrar produto", "remove_error": "Erro ao remover produto", "removed": "Produto removido", "search_placeholder": "Buscar por nome ou SKU", "status": { "low": "Baixo", "out": "Zerado" }, "subtitle": "Produtos e níveis de reposição.", "title": "Estoque" };
const languages$2 = { "en": "English", "es": "Español", "pt": "Português (Brasil)" };
const nav$2 = { "agenda": "Agenda", "ai_business": "AI Business", "clients": "Clientes", "commissions": "Comissões", "crm": "CRM", "finance": "Financeiro", "home": "Início", "inventory": "Estoque", "logout": "Sair", "menu": "Menu", "modules": "Módulos", "online_booking": "Agendamento", "recovery": "Recuperação", "reports": "Relatórios", "services": "Serviços", "settings": "Ajustes", "subscription": "Assinatura", "vip_plans": "Planos VIP", "work_mode": "Modo Trabalho" };
const reports$2 = { "subtitle": "Analise a saúde da barbearia.", "title": "Relatórios" };
const services$2 = { "cancel": "CANCELAR", "confirm_remove_desc": "Esta ação não pode ser desfeita. O serviço será removido permanentemente.", "confirm_remove_title": "Remover Serviço?", "edit_service": "Editar serviço", "empty": "Nenhum serviço cadastrado.", "empty_cta": "CRIAR MEU PRIMEIRO SERVIÇO", "empty_subtitle": "Comece adicionando seu primeiro serviço.", "empty_title": "Nenhum serviço", "form": { "active_hint": "Serviços inativos não aparecem para agendamento", "active_label": "Serviço Ativo", "cancel": "Cancelar", "color_aria": "Cor {{color}}", "color_label": "Cor na Agenda", "create": "CRIAR", "description_label": "Descrição (Opcional)", "description_placeholder": "Descreva o que está incluso no serviço...", "duration_label": "Duração (Min)", "name_label": "Nome do Serviço", "name_placeholder": "Ex: Corte Degradê", "price_label": "Preço (R$)", "save": "SALVAR", "validation": { "duration_min": "Duração deve ser pelo menos 1 minuto", "name_min": "Nome deve ter pelo menos 2 caracteres", "price_min": "Preço deve ser positivo" } }, "loading": "Carregando serviços...", "minutes_short": "MIN", "new_service": "Novo serviço", "no_description": "Sem descrição detalhada", "remove": "REMOVER", "search_placeholder": "Buscar serviço por nome...", "subtitle": "Preços e duração dos seus atendimentos.", "title": "Serviços", "toast": { "created": "Serviço criado com sucesso", "load_error": "Erro ao carregar serviços", "not_authenticated": "Usuário não autenticado", "remove_error": "Erro ao remover serviço", "removed": "Serviço removido", "save_error": "Erro ao salvar serviço", "updated": "Serviço atualizado com sucesso" } };
const settings$2 = { "logout_hint": "Você precisará entrar novamente na próxima vez.", "logout_title": "Sair da conta", "region": { "country": "País", "currency": "Moeda", "date_format": "Formato de Data", "language": "Idioma", "save_error": "Não foi possível salvar as preferências", "saved": "Preferências regionais salvas", "subtitle": "Idioma, moeda e formatos regionais.", "time_format": "Formato de Hora", "timezone": "Fuso Horário", "title": "Região" }, "section_account": "Zona de conta", "section_business": "Negócio", "section_communication": "Comunicação", "section_financial": "Financeiro", "section_profile": "Perfil", "section_security": "Segurança", "section_system": "Sistema", "section_team": "Equipe", "subtitle": "Gerencie sua conta, barbearia e preferências do sistema.", "title": "Configurações" };
const subscription$2 = { "cancel": "Cancelar assinatura", "change_plan": "Trocar plano", "current_plan": "Plano atual", "next_billing": "Próxima cobrança", "status": "Status", "subtitle": "Plano, cobrança e status.", "title": "Assinatura" };
const pt = {
  admin: admin$2,
  agenda: agenda$2,
  clients: clients$2,
  common: common$2,
  countries: countries$2,
  dashboard: dashboard$2,
  finance: finance$2,
  inventory: inventory$2,
  languages: languages$2,
  nav: nav$2,
  reports: reports$2,
  services: services$2,
  settings: settings$2,
  subscription: subscription$2
};
const admin$1 = { "audit_log": "Audit log", "customers": "Customers", "licenses": "Licenses", "subtitle": "SaaS administration.", "title": "Master Panel" };
const agenda$1 = { "actions": { "cancel": "Cancel", "complete": "Complete", "edit": "Edit", "remove": "Remove", "start": "Start", "whatsapp": "WhatsApp" }, "aria": { "current_time": "Current time", "drag_reorder": "Drag to reorder", "next_day": "Next day", "prev_day": "Previous day" }, "back_today": "Back to today", "badges": { "new": "New", "next": "Next" }, "block": { "break": "Break", "generic": "Blocked", "vacation": "Vacation" }, "cancel_dialog": { "back": "Back", "body": "The slot will be marked as cancelled on your schedule.", "confirm": "Cancel slot", "title": "Cancel this slot?" }, "cancelled_success": "Appointment cancelled", "client_avulso": "Walk-in client", "create_appointment": "Create appointment", "duration_min": "{{count}} min", "edit_slot": "Edit slot", "empty": "No appointments in this period.", "empty_body": "No appointments for this day.", "empty_title": "Schedule is clear", "load_error": "Failed to load schedule", "month": "Month", "new_appointment": "New appointment", "new_slot": "New slot", "remove_dialog": { "body": "This appointment will be permanently removed from history.", "cancel": "Cancel", "confirm": "Remove", "title": "Remove record?" }, "remove_error": "Failed to remove", "removed_success": "Appointment removed", "reorder_error": "Failed to reorder", "reorder_success": "Slots reordered", "service_fallback": "Service", "started_success": "Appointment started", "stats": { "appointments": "Appointments", "client_fallback": "Client", "done_count": "{{count}} completed", "next": "Next", "next_none": "Nothing coming up", "revenue": "Revenue", "revenue_hint": "Today (completed)", "waiting": "Waiting", "waiting_hint": "Confirm clients" }, "status": { "cancelled": "Cancelled", "completed": "Completed", "in_progress": "In progress", "scheduled": "Waiting" }, "subtitle": "Organize your appointments.", "title": "Schedule", "today": "Today", "today_at": "Today · {{time}}", "update_error": "Failed to update", "week": "Week" };
const clients$1 = { "actions": { "edit": "Edit", "remove": "Remove", "schedule": "Schedule", "view": "View details", "whatsapp": "WhatsApp" }, "badges": { "inactive": "Inactive", "new": "New", "recurring": "Recurring", "return": "Return" }, "clear_filters": "Clear filters", "clear_search": "Clear search", "delete_dialog": { "body": "The client and their history will be permanently removed.", "cancel": "Cancel", "confirm": "Delete", "title": "Delete client?" }, "edit_client": "Edit client", "empty": "No clients yet.", "empty_state": { "empty_body": "Add your first client to get started.", "empty_title": "Your base is empty", "no_results_body": "Adjust the search or active filters.", "no_results_title": "No clients found" }, "filters": { "active": "Active", "all": "All", "inactive": "Inactive", "new": "New", "recurring": "Recurring", "return": "Return", "vip": "VIP" }, "info": { "last": "Last: {{date}}", "never": "Never visited", "next": "Next: {{date}}" }, "load_error": "Failed to load clients", "metrics": { "avg_ticket": "Avg ticket", "total_spent": "Total spent", "visits": "Visits" }, "new_client": "New client", "register": "Add client", "remove_error": "Failed to remove client", "removed": "Client removed", "search_placeholder": "Search by name or phone...", "stats": { "active": "Active", "active_hint": "Visit in last 60 days", "retention": "Retention", "retention_hint": "{{count}} inactive", "total": "Total", "total_hint": "Registered base", "vip": "VIP", "vip_hint": "Active membership" }, "subtitle": "Your relationships in one place.", "title": "Clients" };
const common$1 = { "actions": "Actions", "add": "Add", "authenticating": "Authenticating...", "back": "Back", "cancel": "Cancel", "close": "Close", "confirm": "Confirm", "delete": "Delete", "edit": "Edit", "error_generic": "Something went wrong. Please try again.", "goodbye": "See you soon!", "loading": "Loading...", "loading_profile": "Loading profile...", "logout_error": "Sign-out failed", "new": "New", "no": "No", "open": "Open", "save": "Save", "save_changes": "Save changes", "saving": "Saving", "search": "Search", "session_expired": "Your session has expired or is invalid.", "view_all": "View all", "yes": "Yes" };
const countries$1 = { "BR": "Brazil", "ES": "Spain", "US": "United States" };
const dashboard$1 = { "appointments_today": "{{count}} appointment", "appointments_today_other": "{{count}} appointments", "average_ticket": "Average ticket", "avg_ticket_base": "Based on {{count}} visits", "clients_at_risk": "Clients at risk", "clients_at_risk_hint": "Need attention", "greeting": "Welcome", "insights_body": "Corte Certo AI analyzes your flow and suggests concrete actions to boost revenue.", "insights_cta": "See insights", "insights_title": "Grow your barbershop with data", "inventory_alerts": "alert", "inventory_label": "Inventory", "monthly_goal": "Monthly goal", "next_appointment": "Next appointment", "of_goal": "{{current}} of {{goal}}", "reports_link": "Reports", "revenue_today": "Today's revenue", "quick_actions": { "new_appointment": "New appointment", "new_client": "New client", "new_sale": "New sale", "new_service": "New service" }, "smart_day": { "actions": { "confirm_clients": "Confirm clients", "open_agenda": "Open schedule", "register_sale": "Register sale", "view_stock": "View stock" }, "items": { "appointments": "Appointments", "cancelled_today": "Cancellations today", "expected_revenue": "Day forecast", "low_stock": "Low stock", "next_client": "Next client", "pending_confirmation": "Waiting confirmation" }, "messages": { "busy_day": "Today will be busy. Keep the pace!", "cancelled": "Some cancellations today. Consider reopening times.", "empty_day": "No appointments today. A good moment to promote open slots.", "full_day": "Your day is almost complete.", "low_stock": "Your stock needs attention.", "ok": "Your day is under control. Good work!", "pending": "You have {{count}} client waiting for confirmation.", "pending_other": "You have {{count}} clients waiting for confirmation." }, "title": "Smart day summary" }, "subtitle": "Here's your barbershop in real time.", "view_agenda": "View schedule", "week": "Week", "work_mode": "Work mode" };
const finance$1 = { "charts": { "evolution_subtitle": "Income vs expenses per day", "evolution_title": "Month evolution", "no_completed_services": "No completed services", "top_services_subtitle": "Highest revenue this month", "top_services_title": "Top services" }, "delete_dialog": { "body": "This permanently removes the record from your cash flow.", "cancel": "Cancel", "confirm": "Delete", "title": "Delete entry?" }, "expenses": "Expenses", "filters": { "all": "All", "month": "Month", "today": "Today", "week": "Week" }, "highlights": { "all_good": "All good.", "low_stock": "Low stock", "no_products": "No products registered.", "no_services": "No completed services yet", "products_subtitle": "Low stock and highest potential", "products_title": "Products", "service_line": "{{count}} visits · ticket {{ticket}}", "services_subtitle": "Best sellers and highest ticket", "services_title": "Featured services", "top_potential": "Highest revenue potential" }, "kpi": { "avg_ticket": "Average ticket", "expenses": "Expenses", "margin": "Margin {{value}}%", "month": "Month", "profit": "Estimated profit", "services": "Services", "services_hint": "Completed this month", "today": "Today" }, "load_error": "Failed to load finance", "movements": { "by_category": "By category", "count": "{{count}} entries in period", "empty_body": "Record income and expenses to get started.", "empty_cta": "Add first entry", "empty_title": "No transactions in period", "fallback_label": "Entry", "no_data": "No data.", "title": "Transactions" }, "new_entry": "New entry", "profit": "Profit", "remove_error": "Failed to remove entry", "removed": "Entry removed", "revenue": "Income", "subtitle": "Income, expenses and monthly result.", "title": "Finance" };
const inventory$1 = { "aria": { "delete": "Delete product", "edit": "Edit product" }, "delete_dialog": { "body": "This permanently removes {{name}} from your inventory.", "cancel": "Cancel", "confirm": "Delete", "title": "Delete product?" }, "edit_product": "Edit product", "empty": { "filtered_body": "Adjust the filter or search.", "filtered_title": "Nothing matches this filter", "none_body": "Add your first products to get started.", "none_title": "No products registered" }, "filters": { "all": "All", "healthy": "Healthy", "low": "Low stock", "out": "Out of stock" }, "form": { "cancel": "Cancel", "create": "ADD", "current_stock_label": "Current Stock", "min_stock_label": "Min. Alert", "name_label": "Product Name", "name_placeholder": "e.g. Matte Effect Pomade", "purchase_price_label": "Cost Price ($)", "save": "SAVE", "selling_price_label": "Selling Price ($)", "sku_label": "SKU / Code", "sku_placeholder": "Optional", "toast": { "created": "Product added", "not_authenticated": "User not authenticated", "save_error": "Failed to save product", "updated": "Product updated" }, "validation": { "min_stock_min": "Minimum cannot be negative", "name_min": "Name must be at least 2 characters", "purchase_min": "Cost price must be positive", "selling_min": "Selling price must be positive", "stock_min": "Stock cannot be negative" } }, "kpi": { "low": "Low stock", "profit": "Potential profit", "units": "Items in stock", "value": "Stock value" }, "labels": { "margin": "Margin", "min_short": "min", "sale": "Sale", "sku": "SKU", "units_short": "un" }, "load_error": "Failed to load inventory", "low_stock": "Low stock", "new_product": "New product", "register_product": "Add product", "remove_error": "Failed to remove product", "removed": "Product removed", "search_placeholder": "Search by name or SKU", "status": { "low": "Low", "out": "Out" }, "subtitle": "Products and reorder levels.", "title": "Inventory" };
const languages$1 = { "en": "English", "es": "Español", "pt": "Português (Brasil)" };
const nav$1 = { "agenda": "Schedule", "ai_business": "AI Business", "clients": "Clients", "commissions": "Commissions", "crm": "CRM", "finance": "Finance", "home": "Home", "inventory": "Inventory", "logout": "Sign out", "menu": "Menu", "modules": "Modules", "online_booking": "Online booking", "recovery": "Retention", "reports": "Reports", "services": "Services", "settings": "Settings", "subscription": "Subscription", "vip_plans": "VIP plans", "work_mode": "Work mode" };
const reports$1 = { "subtitle": "Analyze your barbershop's health.", "title": "Reports" };
const services$1 = { "cancel": "CANCEL", "confirm_remove_desc": "This action cannot be undone. The service will be permanently removed.", "confirm_remove_title": "Remove service?", "edit_service": "Edit service", "empty": "No services yet.", "empty_cta": "CREATE MY FIRST SERVICE", "empty_subtitle": "Start by adding your first service.", "empty_title": "No services", "form": { "active_hint": "Inactive services do not appear for booking", "active_label": "Active service", "cancel": "Cancel", "color_aria": "Color {{color}}", "color_label": "Calendar color", "create": "CREATE", "description_label": "Description (optional)", "description_placeholder": "Describe what is included in the service...", "duration_label": "Duration (min)", "name_label": "Service name", "name_placeholder": "e.g. Fade cut", "price_label": "Price ($)", "save": "SAVE", "validation": { "duration_min": "Duration must be at least 1 minute", "name_min": "Name must be at least 2 characters", "price_min": "Price must be positive" } }, "loading": "Loading services...", "minutes_short": "MIN", "new_service": "New service", "no_description": "No detailed description", "remove": "REMOVE", "search_placeholder": "Search service by name...", "subtitle": "Prices and duration of your services.", "title": "Services", "toast": { "created": "Service created successfully", "load_error": "Failed to load services", "not_authenticated": "User not authenticated", "remove_error": "Failed to remove service", "removed": "Service removed", "save_error": "Failed to save service", "updated": "Service updated successfully" } };
const settings$1 = { "logout_hint": "You'll need to sign in again next time.", "logout_title": "Sign out", "region": { "country": "Country", "currency": "Currency", "date_format": "Date format", "language": "Language", "save_error": "Could not save preferences", "saved": "Regional preferences saved", "subtitle": "Language, currency and regional formats.", "time_format": "Time format", "timezone": "Timezone", "title": "Region" }, "section_account": "Account zone", "section_business": "Business", "section_communication": "Communication", "section_financial": "Financial", "section_profile": "Profile", "section_security": "Security", "section_system": "System", "section_team": "Team", "subtitle": "Manage your account, shop and system preferences.", "title": "Settings" };
const subscription$1 = { "cancel": "Cancel subscription", "change_plan": "Change plan", "current_plan": "Current plan", "next_billing": "Next billing", "status": "Status", "subtitle": "Plan, billing and status.", "title": "Subscription" };
const en = {
  admin: admin$1,
  agenda: agenda$1,
  clients: clients$1,
  common: common$1,
  countries: countries$1,
  dashboard: dashboard$1,
  finance: finance$1,
  inventory: inventory$1,
  languages: languages$1,
  nav: nav$1,
  reports: reports$1,
  services: services$1,
  settings: settings$1,
  subscription: subscription$1
};
const admin = { "audit_log": "Auditoría", "customers": "Clientes", "licenses": "Licencias", "subtitle": "Administración del SaaS.", "title": "Panel Master" };
const agenda = { "actions": { "cancel": "Cancelar", "complete": "Completar", "edit": "Editar", "remove": "Eliminar", "start": "Iniciar", "whatsapp": "WhatsApp" }, "aria": { "current_time": "Hora actual", "drag_reorder": "Arrastra para reordenar", "next_day": "Día siguiente", "prev_day": "Día anterior" }, "back_today": "Volver a hoy", "badges": { "new": "Nuevo", "next": "Próximo" }, "block": { "break": "Pausa", "generic": "Bloqueo", "vacation": "Vacaciones" }, "cancel_dialog": { "back": "Volver", "body": "El horario será marcado como cancelado en tu agenda.", "confirm": "Cancelar horario", "title": "¿Cancelar horario?" }, "cancelled_success": "Cita cancelada", "client_avulso": "Cliente sin registro", "create_appointment": "Crear cita", "duration_min": "{{count}} min", "edit_slot": "Editar horario", "empty": "No hay citas en este período.", "empty_body": "No hay citas para este día.", "empty_title": "Agenda libre", "load_error": "Error al cargar la agenda", "month": "Mes", "new_appointment": "Nueva cita", "new_slot": "Nuevo horario", "remove_dialog": { "body": "Esta cita se eliminará permanentemente del historial.", "cancel": "Cancelar", "confirm": "Eliminar", "title": "¿Eliminar registro?" }, "remove_error": "Error al eliminar", "removed_success": "Cita eliminada", "reorder_error": "Error al reordenar", "reorder_success": "Horarios reordenados", "service_fallback": "Servicio", "started_success": "Atención iniciada", "stats": { "appointments": "Citas", "client_fallback": "Cliente", "done_count": "{{count}} completadas", "next": "Próximo", "next_none": "Nada a continuación", "revenue": "Facturación", "revenue_hint": "Del día (completadas)", "waiting": "En espera", "waiting_hint": "Confirmar clientes" }, "status": { "cancelled": "Cancelado", "completed": "Completado", "in_progress": "En atención", "scheduled": "En espera" }, "subtitle": "Organiza tus citas.", "title": "Agenda", "today": "Hoy", "today_at": "Hoy · {{time}}", "update_error": "Error al actualizar", "week": "Semana" };
const clients = { "actions": { "edit": "Editar", "remove": "Eliminar", "schedule": "Agendar", "view": "Ver detalles", "whatsapp": "WhatsApp" }, "badges": { "inactive": "Inactivo", "new": "Nuevo", "recurring": "Recurrente", "return": "Volver" }, "clear_filters": "Limpiar filtros", "clear_search": "Limpiar búsqueda", "delete_dialog": { "body": "El cliente y su historial se eliminarán permanentemente.", "cancel": "Cancelar", "confirm": "Eliminar", "title": "¿Eliminar cliente?" }, "edit_client": "Editar cliente", "empty": "Aún no hay clientes.", "empty_state": { "empty_body": "Registra tu primer cliente para comenzar.", "empty_title": "Tu base está vacía", "no_results_body": "Ajusta la búsqueda o los filtros activos.", "no_results_title": "No se encontraron clientes" }, "filters": { "active": "Activos", "all": "Todos", "inactive": "Inactivos", "new": "Nuevos", "recurring": "Recurrentes", "return": "Volver", "vip": "VIP" }, "info": { "last": "Última: {{date}}", "never": "Nunca visitó", "next": "Próxima: {{date}}" }, "load_error": "Error al cargar clientes", "metrics": { "avg_ticket": "Ticket promedio", "total_spent": "Total gastado", "visits": "Visitas" }, "new_client": "Nuevo cliente", "register": "Registrar cliente", "remove_error": "Error al eliminar cliente", "removed": "Cliente eliminado", "search_placeholder": "Buscar por nombre o teléfono...", "stats": { "active": "Activos", "active_hint": "Visita en los últimos 60 días", "retention": "Retención", "retention_hint": "{{count}} inactivos", "total": "Total", "total_hint": "Base registrada", "vip": "VIP", "vip_hint": "Con membresía activa" }, "subtitle": "Tu relación en un solo lugar.", "title": "Clientes" };
const common = { "actions": "Acciones", "add": "Añadir", "authenticating": "Autenticando...", "back": "Volver", "cancel": "Cancelar", "close": "Cerrar", "confirm": "Confirmar", "delete": "Eliminar", "edit": "Editar", "error_generic": "Ha ocurrido un error. Inténtalo de nuevo.", "goodbye": "¡Hasta pronto!", "loading": "Cargando...", "loading_profile": "Cargando perfil...", "logout_error": "Error al cerrar sesión", "new": "Nuevo", "no": "No", "open": "Abrir", "save": "Guardar", "save_changes": "Guardar cambios", "saving": "Guardando", "search": "Buscar", "session_expired": "Tu sesión ha caducado o no es válida.", "view_all": "Ver todos", "yes": "Sí" };
const countries = { "BR": "Brasil", "ES": "España", "US": "Estados Unidos" };
const dashboard = { "appointments_today": "{{count}} cita", "appointments_today_other": "{{count}} citas", "average_ticket": "Ticket promedio", "avg_ticket_base": "Base de {{count}} visitas", "clients_at_risk": "Clientes en riesgo", "clients_at_risk_hint": "Necesitan atención", "greeting": "Bienvenido", "insights_body": "Corte Certo AI analiza tu flujo y sugiere acciones concretas para aumentar tus ingresos.", "insights_cta": "Ver insights", "insights_title": "Haz crecer tu barbería con datos", "inventory_alerts": "en alerta", "inventory_label": "Inventario", "monthly_goal": "Meta mensual", "next_appointment": "Próxima cita", "of_goal": "{{current}} de {{goal}}", "reports_link": "Informes", "revenue_today": "Ingresos de hoy", "quick_actions": { "new_appointment": "Nueva cita", "new_client": "Nuevo cliente", "new_sale": "Nueva venta", "new_service": "Nuevo servicio" }, "smart_day": { "actions": { "confirm_clients": "Confirmar clientes", "open_agenda": "Abrir agenda", "register_sale": "Registrar venta", "view_stock": "Ver stock" }, "items": { "appointments": "Citas", "cancelled_today": "Cancelaciones hoy", "expected_revenue": "Previsión del día", "low_stock": "Stock bajo", "next_client": "Próximo cliente", "pending_confirmation": "Esperando confirmación" }, "messages": { "busy_day": "Hoy será un día movido. ¡Mantén el ritmo!", "cancelled": "Algunas cancelaciones hoy. Considera reabrir horarios.", "empty_day": "Sin citas hoy. Buen momento para divulgar horarios libres.", "full_day": "Tu día está prácticamente completo.", "low_stock": "Tu stock necesita atención.", "ok": "Tu día está bajo control. ¡Buen trabajo!", "pending": "Tienes {{count}} cliente esperando confirmación.", "pending_other": "Tienes {{count}} clientes esperando confirmación." }, "title": "Resumen inteligente del día" }, "subtitle": "Aquí está tu barbería en tiempo real.", "view_agenda": "Ver agenda", "week": "Semana", "work_mode": "Modo trabajo" };
const finance = { "charts": { "evolution_subtitle": "Ingresos vs gastos por día", "evolution_title": "Evolución del mes", "no_completed_services": "Sin servicios completados", "top_services_subtitle": "Mayor facturación del mes", "top_services_title": "Top servicios" }, "delete_dialog": { "body": "Esta acción elimina el registro de tu flujo de caja permanentemente.", "cancel": "Cancelar", "confirm": "Eliminar", "title": "¿Eliminar movimiento?" }, "expenses": "Gastos", "filters": { "all": "Todo", "month": "Mes", "today": "Hoy", "week": "Semana" }, "highlights": { "all_good": "Todo en orden.", "low_stock": "Stock bajo", "no_products": "Sin productos registrados.", "no_services": "Aún no hay servicios completados", "products_subtitle": "Stock bajo y mayor potencial", "products_title": "Productos", "service_line": "{{count}} visitas · ticket {{ticket}}", "services_subtitle": "Más vendidos y mayor ticket", "services_title": "Servicios destacados", "top_potential": "Mayor facturación potencial" }, "kpi": { "avg_ticket": "Ticket promedio", "expenses": "Gastos", "margin": "Margen {{value}}%", "month": "Mes", "profit": "Beneficio estimado", "services": "Servicios", "services_hint": "Completados en el mes", "today": "Hoy" }, "load_error": "Error al cargar finanzas", "movements": { "by_category": "Por categoría", "count": "{{count}} movimientos en el período", "empty_body": "Registra ingresos y gastos para comenzar.", "empty_cta": "Registrar primer valor", "empty_title": "Sin movimientos en el período", "fallback_label": "Movimiento", "no_data": "Sin datos.", "title": "Movimientos" }, "new_entry": "Nuevo movimiento", "profit": "Beneficio", "remove_error": "Error al eliminar movimiento", "removed": "Movimiento eliminado", "revenue": "Ingresos", "subtitle": "Ingresos, gastos y resultado del mes.", "title": "Finanzas" };
const inventory = { "aria": { "delete": "Eliminar producto", "edit": "Editar producto" }, "delete_dialog": { "body": "Esta acción elimina {{name}} permanentemente del inventario.", "cancel": "Cancelar", "confirm": "Eliminar", "title": "¿Eliminar producto?" }, "edit_product": "Editar producto", "empty": { "filtered_body": "Ajusta el filtro o la búsqueda.", "filtered_title": "Nada coincide con este filtro", "none_body": "Registra tus primeros productos para empezar.", "none_title": "Sin productos registrados" }, "filters": { "all": "Todos", "healthy": "Saludable", "low": "Stock bajo", "out": "Sin stock" }, "form": { "cancel": "Cancelar", "create": "REGISTRAR", "current_stock_label": "Stock Actual", "min_stock_label": "Mín. p/ Alerta", "name_label": "Nombre del Producto", "name_placeholder": "Ej: Pomada Efecto Mate", "purchase_price_label": "Precio Compra", "save": "GUARDAR", "selling_price_label": "Precio Venta", "sku_label": "SKU / Código", "sku_placeholder": "Opcional", "toast": { "created": "Producto registrado", "not_authenticated": "Usuario no autenticado", "save_error": "Error al guardar el producto", "updated": "Producto actualizado" }, "validation": { "min_stock_min": "El mínimo no puede ser negativo", "name_min": "El nombre debe tener al menos 2 caracteres", "purchase_min": "El precio de compra debe ser positivo", "selling_min": "El precio de venta debe ser positivo", "stock_min": "El stock no puede ser negativo" } }, "kpi": { "low": "Stock bajo", "profit": "Beneficio potencial", "units": "Ítems en stock", "value": "Valor del stock" }, "labels": { "margin": "Margen", "min_short": "mín", "sale": "Venta", "sku": "SKU", "units_short": "un" }, "load_error": "Error al cargar el inventario", "low_stock": "Stock bajo", "new_product": "Nuevo producto", "register_product": "Registrar producto", "remove_error": "Error al eliminar el producto", "removed": "Producto eliminado", "search_placeholder": "Buscar por nombre o SKU", "status": { "low": "Bajo", "out": "Sin stock" }, "subtitle": "Productos y niveles de reposición.", "title": "Inventario" };
const languages = { "en": "English", "es": "Español", "pt": "Português (Brasil)" };
const nav = { "agenda": "Agenda", "ai_business": "AI Business", "clients": "Clientes", "commissions": "Comisiones", "crm": "CRM", "finance": "Finanzas", "home": "Inicio", "inventory": "Inventario", "logout": "Cerrar sesión", "menu": "Menú", "modules": "Módulos", "online_booking": "Reservas", "recovery": "Recuperación", "reports": "Informes", "services": "Servicios", "settings": "Ajustes", "subscription": "Suscripción", "vip_plans": "Planes VIP", "work_mode": "Modo trabajo" };
const reports = { "subtitle": "Analiza la salud de tu barbería.", "title": "Informes" };
const services = { "cancel": "CANCELAR", "confirm_remove_desc": "Esta acción no se puede deshacer. El servicio se eliminará permanentemente.", "confirm_remove_title": "¿Eliminar servicio?", "edit_service": "Editar servicio", "empty": "Aún no hay servicios.", "empty_cta": "CREAR MI PRIMER SERVICIO", "empty_subtitle": "Empieza agregando tu primer servicio.", "empty_title": "Sin servicios", "form": { "active_hint": "Los servicios inactivos no aparecen para reserva", "active_label": "Servicio activo", "cancel": "Cancelar", "color_aria": "Color {{color}}", "color_label": "Color en la agenda", "create": "CREAR", "description_label": "Descripción (opcional)", "description_placeholder": "Describe qué incluye el servicio...", "duration_label": "Duración (min)", "name_label": "Nombre del servicio", "name_placeholder": "Ej: Corte degradado", "price_label": "Precio ($)", "save": "GUARDAR", "validation": { "duration_min": "La duración debe ser al menos 1 minuto", "name_min": "El nombre debe tener al menos 2 caracteres", "price_min": "El precio debe ser positivo" } }, "loading": "Cargando servicios...", "minutes_short": "MIN", "new_service": "Nuevo servicio", "no_description": "Sin descripción detallada", "remove": "ELIMINAR", "search_placeholder": "Buscar servicio por nombre...", "subtitle": "Precios y duración de tus servicios.", "title": "Servicios", "toast": { "created": "Servicio creado con éxito", "load_error": "Error al cargar servicios", "not_authenticated": "Usuario no autenticado", "remove_error": "Error al eliminar el servicio", "removed": "Servicio eliminado", "save_error": "Error al guardar el servicio", "updated": "Servicio actualizado con éxito" } };
const settings = { "logout_hint": "Necesitarás iniciar sesión de nuevo la próxima vez.", "logout_title": "Cerrar sesión", "region": { "country": "País", "currency": "Moneda", "date_format": "Formato de fecha", "language": "Idioma", "save_error": "No se pudieron guardar las preferencias", "saved": "Preferencias regionales guardadas", "subtitle": "Idioma, moneda y formatos regionales.", "time_format": "Formato de hora", "timezone": "Zona horaria", "title": "Región" }, "section_account": "Zona de cuenta", "section_business": "Negocio", "section_communication": "Comunicación", "section_financial": "Financiero", "section_profile": "Perfil", "section_security": "Seguridad", "section_system": "Sistema", "section_team": "Equipo", "subtitle": "Gestiona tu cuenta, barbería y preferencias del sistema.", "title": "Ajustes" };
const subscription = { "cancel": "Cancelar suscripción", "change_plan": "Cambiar plan", "current_plan": "Plan actual", "next_billing": "Próximo cobro", "status": "Estado", "subtitle": "Plan, facturación y estado.", "title": "Suscripción" };
const es = {
  admin,
  agenda,
  clients,
  common,
  countries,
  dashboard,
  finance,
  inventory,
  languages,
  nav,
  reports,
  services,
  settings,
  subscription
};
const SUPPORTED_LANGUAGES = ["pt", "en", "es"];
const DEFAULT_LANGUAGE = "pt";
function readStoredLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const raw = window.localStorage.getItem("app_language");
    const normalized = raw?.slice(0, 2).toLowerCase();
    if (normalized && SUPPORTED_LANGUAGES.includes(normalized)) {
      return normalized;
    }
  } catch {
  }
  return DEFAULT_LANGUAGE;
}
if (!instance.isInitialized) {
  instance.use(initReactI18next).init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es }
    },
    lng: readStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false,
    react: {
      useSuspense: false
    }
  });
}
function setLanguage(lang) {
  const normalized = lang?.slice(0, 2).toLowerCase();
  const target = SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
  if (instance.language !== target) {
    instance.changeLanguage(target);
  }
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("app_language", target);
    }
  } catch {
  }
}
const COUNTRY_DEFAULTS = {
  BR: {
    currency: "BRL",
    timezone: "America/Sao_Paulo",
    date_format: "dd/MM/yyyy",
    time_format: "24h"
  },
  US: {
    currency: "USD",
    timezone: "America/New_York",
    date_format: "MM/dd/yyyy",
    time_format: "12h"
  },
  ES: { currency: "EUR", timezone: "Europe/Madrid", date_format: "dd/MM/yyyy", time_format: "24h" }
};
function getCountryDefaults(country) {
  return COUNTRY_DEFAULTS[country] ?? COUNTRY_DEFAULTS.BR;
}
const STORAGE_KEY = "app_locale_prefs_v1";
const FALLBACK = {
  language: "pt",
  country: "BR",
  currency: "BRL",
  timezone: "America/Sao_Paulo",
  date_format: "dd/MM/yyyy",
  time_format: "24h"
};
function detectBrowserLanguage() {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const nav2 = (navigator.language || "").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGUAGES.includes(nav2) ? nav2 : DEFAULT_LANGUAGE;
}
function useLocale() {
  const [prefs, setPrefs] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = window.localStorage.getItem(STORAGE_KEY);
        if (cached) return { ...FALLBACK, ...JSON.parse(cached) };
      } catch {
      }
    }
    return { ...FALLBACK, language: detectBrowserLanguage() };
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    setLanguage(prefs.language);
  }, [prefs.language]);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLanguage(detectBrowserLanguage());
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("profiles").select("language, country, currency, timezone, date_format, time_format").eq("id", userData.user.id).maybeSingle();
      if (cancelled) return;
      if (data) {
        const merged = {
          language: data.language ?? FALLBACK.language,
          country: data.country ?? FALLBACK.country,
          currency: data.currency ?? FALLBACK.currency,
          timezone: data.timezone ?? FALLBACK.timezone,
          date_format: data.date_format ?? FALLBACK.date_format,
          time_format: data.time_format ?? FALLBACK.time_format
        };
        setPrefs(merged);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
        }
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const update = reactExports.useCallback(
    async (patch) => {
      const next = { ...prefs, ...patch };
      if (patch.country && patch.country !== prefs.country) {
        const defs = getCountryDefaults(patch.country);
        if (!patch.currency) next.currency = defs.currency;
        if (!patch.timezone) next.timezone = defs.timezone;
        if (!patch.date_format) next.date_format = defs.date_format;
        if (!patch.time_format) next.time_format = defs.time_format;
      }
      setPrefs(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
      }
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from("profiles").update(next).eq("id", userData.user.id);
      }
      return next;
    },
    [prefs]
  );
  return { prefs, loading, update };
}
const COUNTRIES = [
  { code: "BR", labelKey: "countries.BR" },
  { code: "US", labelKey: "countries.US" },
  { code: "ES", labelKey: "countries.ES" }
];
const LANGUAGES = [
  { code: "pt", labelKey: "languages.pt" },
  { code: "en", labelKey: "languages.en" },
  { code: "es", labelKey: "languages.es" }
];
const CURRENCIES = ["BRL", "USD", "EUR"];
const TIMEZONES = [
  "America/Sao_Paulo",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/Madrid",
  "Europe/London",
  "UTC"
];
const DATE_FORMATS = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"];
const TIME_FORMATS = ["24h", "12h"];
function RegionSettings() {
  const { t } = useTranslation();
  const { prefs, update } = useLocale();
  const handleChange = async (patch) => {
    try {
      await update(patch);
      toast.success("Preferências salvas");
    } catch {
      toast.error("Erro ao salvar região");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-3xl border-border bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Região e Formatos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Idioma, moeda e fuso horário para exibição dos dados." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "País", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: prefs.country, onValueChange: (v) => handleChange({ country: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.code, children: c.code === "BR" ? "Brasil" : c.code === "US" ? "Estados Unidos" : "Espanha" }, c.code)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Idioma", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: prefs.language, onValueChange: (v) => handleChange({ language: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l.code, children: l.code === "pt" ? "Português" : l.code === "en" ? "Inglês" : "Espanhol" }, l.code)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Moeda", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: prefs.currency, onValueChange: (v) => handleChange({ currency: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Fuso Horário", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: prefs.timezone, onValueChange: (v) => handleChange({ timezone: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIMEZONES.map((tz) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: tz, children: tz }, tz)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Formato de Data", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: prefs.date_format, onValueChange: (v) => handleChange({ date_format: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DATE_FORMATS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Formato de Hora", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: prefs.time_format, onValueChange: (v) => handleChange({ time_format: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_FORMATS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f === "24h" ? "24h" : "12h (AM/PM)" }, f)) })
      ] }) })
    ] })
  ] });
}
function Field$1({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: label }),
    children
  ] });
}
function SettingsPageWrapper() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsCenter, {}) });
}
const CATEGORIES = [{
  key: "empresa",
  label: "Empresa",
  description: "Identidade, endereço e marca",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
  keywords: ["nome", "logo", "logotipo", "capa", "telefone", "endereço", "cidade", "estado", "descrição", "cor", "marca", "identidade"]
}, {
  key: "agenda",
  label: "Agenda",
  description: "Horários e regras de atendimento",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
  keywords: ["horário", "horarios", "funcionamento", "intervalos", "antecedência", "confirmação", "agenda"]
}, {
  key: "online",
  label: "Agendamento Online",
  description: "Link público e página de agendamento",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
  keywords: ["link", "público", "online", "compartilhar", "tema", "capa", "mensagem"]
}, {
  key: "financeiro",
  label: "Financeiro",
  description: "Moeda, categorias e pagamentos",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }),
  keywords: ["moeda", "data", "categorias", "pagamento", "financeiro", "métodos"]
}, {
  key: "assinatura",
  label: "Assinatura",
  description: "Plano, cobrança e histórico",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
  keywords: ["plano", "assinatura", "cobrança", "cancelar", "histórico", "pagamentos", "premium"]
}, {
  key: "equipe",
  label: "Equipe",
  description: "Profissionais, permissões e funções",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
  keywords: ["equipe", "profissionais", "permissões", "funções", "membros", "barbeiros"]
}, {
  key: "notificacoes",
  label: "Notificações",
  description: "Lembretes e mensagens automáticas",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
  keywords: ["notificações", "lembretes", "confirmações", "cancelamentos", "mensagens", "whatsapp"]
}, {
  key: "seguranca",
  label: "Segurança",
  description: "Senha, sessões e acessos",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
  keywords: ["senha", "sessões", "acessos", "logout", "segurança", "dispositivos"]
}, {
  key: "dados",
  label: "Dados",
  description: "Exportar, importar e excluir",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4" }),
  keywords: ["exportar", "importar", "backup", "excluir", "dados"]
}];
function SettingsCenter() {
  const [active, setActive] = reactExports.useState("empresa");
  const [query, setQuery] = reactExports.useState("");
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.keywords.some((k) => k.includes(q)));
  }, [query]);
  reactExports.useEffect(() => {
    if (query.trim() && filtered.length > 0 && !filtered.find((c) => c.key === active)) {
      setActive(filtered[0].key);
    }
  }, [query, filtered, active]);
  const Sidebar = /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
    filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setActive(c.key);
      setMobileOpen(false);
    }, className: cn("w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors border", active === c.key ? "bg-primary/10 border-primary/20 text-foreground" : "border-transparent hover:bg-secondary/60 text-muted-foreground hover:text-foreground"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border", active === c.key ? "bg-primary/15 text-primary border-primary/20" : "bg-secondary text-muted-foreground border-border"), children: c.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-semibold truncate text-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-muted-foreground truncate", children: c.description })
      ] })
    ] }, c.key)),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-3 py-4", children: "Nenhuma configuração encontrada." })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-[28px] font-semibold tracking-tight", children: "Configurações" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Centro administrativo da sua barbearia." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Pesquisar configuração...", className: "pl-9 h-10 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", "aria-label": "Abrir categorias", className: "md:hidden h-11 w-11 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-80 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3", children: "Categorias" }),
            Sidebar
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden md:block sticky top-4 self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-3 shadow-sm", children: Sidebar }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-sm p-5 md:p-6", children: [
        active === "empresa" && /* @__PURE__ */ jsxRuntimeExports.jsx(CompanySection, {}),
        active === "agenda" && /* @__PURE__ */ jsxRuntimeExports.jsx(AgendaSection, {}),
        active === "online" && /* @__PURE__ */ jsxRuntimeExports.jsx(OnlineSection, {}),
        active === "financeiro" && /* @__PURE__ */ jsxRuntimeExports.jsx(FinanceiroSection, {}),
        active === "assinatura" && /* @__PURE__ */ jsxRuntimeExports.jsx(AssinaturaSection, {}),
        active === "equipe" && /* @__PURE__ */ jsxRuntimeExports.jsx(EquipeSection, {}),
        active === "notificacoes" && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificacoesSection, {}),
        active === "seguranca" && /* @__PURE__ */ jsxRuntimeExports.jsx(SegurancaSection, {}),
        active === "dados" && /* @__PURE__ */ jsxRuntimeExports.jsx(DadosSection, {})
      ] }) })
    ] })
  ] });
}
function SectionHeader({
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold tracking-tight", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
  ] });
}
function Field({
  label,
  hint,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-1.5 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-muted-foreground", children: label }),
    children,
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: hint })
  ] });
}
function LinkRow({
  to,
  title,
  description,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground shrink-0" })
  ] });
}
function CompanySection() {
  const [profile, setProfile] = reactExports.useState(null);
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            user
          }
        } = await supabase.auth.getUser();
        if (!user) return;
        setEmail(user.email || "");
        const {
          data
        } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
        setProfile(data || {
          id: user.id,
          full_name: user.user_metadata?.full_name || "",
          barber_shop_name: ""
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const save = async (e) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").upsert({
        id: profile.id,
        full_name: profile.full_name,
        barber_shop_name: profile.barber_shop_name,
        business_phone: profile.business_phone,
        business_address: profile.business_address,
        business_city: profile.business_city,
        business_state: profile.business_state,
        business_description: profile.business_description,
        brand_color: profile.brand_color,
        brand_color_secondary: profile.brand_color_secondary,
        cover_url: profile.cover_url,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (error) throw error;
      toast.success("Dados da empresa atualizados");
    } catch (err) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingBlock, {});
  const initials = (profile?.barber_shop_name || profile?.full_name || email || "B").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase() || "B";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Empresa", subtitle: "Identidade visual e informações da barbearia." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-secondary/40 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-2xl bg-card border border-border flex items-center justify-center overflow-hidden shadow-sm", style: profile?.brand_color ? {
            borderColor: profile.brand_color
          } : void 0, children: profile?.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar_url, alt: "Logo", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold", style: {
            color: profile?.brand_color || "hsl(var(--primary))"
          }, children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-lg bg-primary text-primary-foreground shadow-md flex items-center justify-center border-2 border-card", "aria-label": "Alterar logotipo", onClick: () => toast.info("Upload de imagem em breve"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold truncate", children: profile?.barber_shop_name || "Sua barbearia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome da empresa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.barber_shop_name || "", onChange: (e) => setProfile({
          ...profile,
          barber_shop_name: e.target.value
        }), placeholder: "Ex.: Corte Certo Barber" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_phone || "", onChange: (e) => setProfile({
          ...profile,
          business_phone: e.target.value
        }), placeholder: "(11) 90000-0000" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endereço", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_address || "", onChange: (e) => setProfile({
          ...profile,
          business_address: e.target.value
        }), placeholder: "Rua, número, bairro" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_city || "", onChange: (e) => setProfile({
          ...profile,
          business_city: e.target.value
        }), placeholder: "Sua cidade" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estado", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.business_state || "", onChange: (e) => setProfile({
          ...profile,
          business_state: e.target.value
        }), placeholder: "UF" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descrição", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: profile?.business_description || "", onChange: (e) => setProfile({
          ...profile,
          business_description: e.target.value
        }), placeholder: "Conte um pouco sobre a sua barbearia", rows: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cor principal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: profile?.brand_color || "#f59e0b", onChange: (e) => setProfile({
            ...profile,
            brand_color: e.target.value
          }), className: "h-10 w-14 rounded-lg border border-border bg-card cursor-pointer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.brand_color || "", onChange: (e) => setProfile({
            ...profile,
            brand_color: e.target.value
          }), placeholder: "#F59E0B" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cor secundária", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: profile?.brand_color_secondary || "#0f172a", onChange: (e) => setProfile({
            ...profile,
            brand_color_secondary: e.target.value
          }), className: "h-10 w-14 rounded-lg border border-border bg-card cursor-pointer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.brand_color_secondary || "", onChange: (e) => setProfile({
            ...profile,
            brand_color_secondary: e.target.value
          }), placeholder: "#0F172A" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "h-10 rounded-xl px-5", children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
        " Salvando"
      ] }) : "Salvar alterações" }) })
    ] })
  ] });
}
const DAYS = [{
  key: "mon",
  label: "Seg"
}, {
  key: "tue",
  label: "Ter"
}, {
  key: "wed",
  label: "Qua"
}, {
  key: "thu",
  label: "Qui"
}, {
  key: "fri",
  label: "Sex"
}, {
  key: "sat",
  label: "Sáb"
}, {
  key: "sun",
  label: "Dom"
}];
function AgendaSection() {
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      const {
        data
      } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      setProfile(data || {
        id: user.id
      });
      setLoading(false);
    })();
  }, []);
  const hours = reactExports.useMemo(() => {
    const raw = profile?.opening_hours || {};
    const out = {};
    for (const d of DAYS) {
      out[d.key] = raw[d.key] || {
        enabled: d.key !== "sun",
        open: "09:00",
        close: "19:00"
      };
    }
    return out;
  }, [profile]);
  const setHours = (key, patch) => {
    setProfile({
      ...profile,
      opening_hours: {
        ...hours,
        [key]: {
          ...hours[key],
          ...patch
        }
      }
    });
  };
  const save = async () => {
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update({
        opening_hours: hours,
        booking_min_notice_min: Number(profile?.booking_min_notice_min ?? 30),
        booking_max_advance_days: Number(profile?.booking_max_advance_days ?? 30),
        booking_auto_confirm: !!profile?.booking_auto_confirm,
        booking_break_min: Number(profile?.booking_break_min ?? 0),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", profile.id);
      if (error) throw error;
      toast.success("Regras da agenda atualizadas");
    } catch (err) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingBlock, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Agenda", subtitle: "Horários de funcionamento e regras de agendamento." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border divide-y divide-border", children: DAYS.map((d) => {
        const h = hours[d.key];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 text-sm font-medium", children: d.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: h.enabled, onCheckedChange: (v) => setHours(d.key, {
            enabled: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: h.open, disabled: !h.enabled, onChange: (e) => setHours(d.key, {
              open: e.target.value
            }), className: "h-9 w-28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "até" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: h.close, disabled: !h.enabled, onChange: (e) => setHours(d.key, {
              close: e.target.value
            }), className: "h-9 w-28" })
          ] })
        ] }, d.key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Intervalo entre agendamentos (min)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: profile?.booking_break_min ?? 0, onChange: (e) => setProfile({
          ...profile,
          booking_break_min: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Antecedência mínima (min)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: profile?.booking_min_notice_min ?? 30, onChange: (e) => setProfile({
          ...profile,
          booking_min_notice_min: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Antecedência máxima (dias)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: profile?.booking_max_advance_days ?? 30, onChange: (e) => setProfile({
          ...profile,
          booking_max_advance_days: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Confirmação automática" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Agendamentos são confirmados sem revisão manual." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!profile?.booking_auto_confirm, onCheckedChange: (v) => setProfile({
            ...profile,
            booking_auto_confirm: v
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, className: "h-10 rounded-xl px-5", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
        "Salvar alterações"
      ] }) })
    ] })
  ] });
}
function OnlineSection() {
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      const {
        data
      } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      setProfile(data || {
        id: user.id
      });
      setLoading(false);
    })();
  }, []);
  const publicUrl = reactExports.useMemo(() => {
    if (typeof window === "undefined" || !profile?.public_slug) return "";
    return `${window.location.origin}/booking/${profile.public_slug}`;
  }, [profile?.public_slug]);
  const save = async () => {
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update({
        booking_enabled: !!profile?.booking_enabled,
        booking_public_message: profile?.booking_public_message || null,
        booking_theme: profile?.booking_theme || "auto",
        booking_cover_url: profile?.booking_cover_url || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", profile.id);
      if (error) throw error;
      toast.success("Página pública atualizada");
    } catch (err) {
      toast.error(err?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingBlock, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Agendamento Online", subtitle: "Página pública para seus clientes agendarem." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Agendamento online ativo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Permite receber agendamentos pelo link público." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!profile?.booking_enabled, onCheckedChange: (v) => setProfile({
          ...profile,
          booking_enabled: v
        }) })
      ] }),
      publicUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs truncate flex-1", children: publicUrl }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
          navigator.clipboard.writeText(publicUrl);
          toast.success("Link copiado");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Copiar"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mensagem pública", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: profile?.booking_public_message || "", onChange: (e) => setProfile({
        ...profile,
        booking_public_message: e.target.value
      }), rows: 3, placeholder: "Mensagem exibida na sua página de agendamento." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tema da página", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: profile?.booking_theme || "auto", onChange: (e) => setProfile({
          ...profile,
          booking_theme: e.target.value
        }), className: "h-10 rounded-xl border border-border bg-background px-3 text-sm w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "auto", children: "Automático" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "light", children: "Claro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "dark", children: "Escuro" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL da imagem de capa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.booking_cover_url || "", onChange: (e) => setProfile({
          ...profile,
          booking_cover_url: e.target.value
        }), placeholder: "https://..." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, className: "h-10 rounded-xl px-5", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
        "Salvar alterações"
      ] }) })
    ] })
  ] });
}
function FinanceiroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Financeiro", subtitle: "Preferências de moeda, datas e pagamentos." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RegionSettings, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/finance", title: "Categorias e lançamentos", description: "Gerencie categorias e regras de fluxo.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/commissions", title: "Comissões", description: "Configure comissões por profissional.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] });
}
function AssinaturaSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Assinatura", subtitle: "Plano, cobrança e histórico de pagamentos." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/subscription", title: "Gerenciar assinatura", description: "Plano atual, status, próxima cobrança e histórico.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/vip-plans", title: "Planos VIP dos clientes", description: "Ofereça assinaturas mensais aos seus clientes.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function EquipeSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Equipe", subtitle: "Profissionais, permissões e funções." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/commissions", title: "Profissionais e comissões", description: "Cadastre profissionais e defina suas comissões.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/admin", title: "Permissões e funções", description: "Papéis administrativos e acesso ao painel.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function NotificacoesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Notificações", subtitle: "Lembretes, confirmações e mensagens automáticas." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/settings/communications", title: "Central de Comunicação", description: "Ative ou desative cada aviso automático por evento.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/settings/notifications", title: "Preferências de notificação", description: "Escolha o que deseja receber.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/settings/notifications", title: "Templates de WhatsApp", description: "Personalize confirmações, lembretes e agradecimentos.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function SegurancaSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Segurança", subtitle: "Sua conta protegida." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LinkRow, { to: "/dashboard/settings/security", title: "Senha e sessões", description: "Alterar senha e revisar dispositivos conectados.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Sair da conta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Encerra sua sessão neste dispositivo." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-10 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive", onClick: () => supabase.auth.signOut(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2" }),
        " Sair"
      ] })
    ] })
  ] });
}
function DadosSection() {
  const exportData = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const [clients2, appointments, services2, financial, products] = await Promise.all([supabase.from("clients").select("*").eq("user_id", user.id), supabase.from("appointments").select("*").eq("user_id", user.id), supabase.from("services").select("*").eq("user_id", user.id), supabase.from("financial_records").select("*").eq("user_id", user.id), supabase.from("products").select("*").eq("user_id", user.id)]);
      const payload = {
        exported_at: (/* @__PURE__ */ new Date()).toISOString(),
        clients: clients2.data ?? [],
        appointments: appointments.data ?? [],
        services: services2.data ?? [],
        financial_records: financial.data ?? [],
        products: products.data ?? []
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `corte-certo-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Backup gerado com sucesso");
    } catch (err) {
      toast.error(err?.message || "Erro ao exportar dados");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Dados", subtitle: "Exportar, importar e gerenciar seus dados." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportData, className: "group flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-colors text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Exportar dados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Baixe um arquivo JSON com todos os seus dados." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-muted-foreground shrink-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Importação de dados em breve"), className: "group flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-colors text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Importar dados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Traga dados de outra ferramenta." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Excluir empresa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ação irreversível. Entre em contato com o suporte para prosseguir." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-10 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive", onClick: () => toast.info("Solicite exclusão em suporte@cortecerto.app"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
          " Excluir"
        ] })
      ] })
    ] })
  ] });
}
function LoadingBlock() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-16 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Carregando…" })
  ] });
}
export {
  SettingsPageWrapper as component
};
