/* Page layout */
.page {
  max-width: 980px;
  margin: 24px auto;
  padding: 0 16px;
}

/* Header row */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 18px;
}

.page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--foreground);
}

.page-subtitle {
  margin: 6px 0 0 0;
  color: var(--muted-foreground);
}

/* User switch */
.user-switch label {
  display: block;
  font-size: 12px;
  color: var(--muted-foreground);
  margin-bottom: 6px;
}

.user-switch select {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--input-background);
  color: var(--foreground);
}


/* Stat cards */
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 12px;
  margin: 18px 0 20px;
}

.stat-card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
}

.stat-label {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
}

.stat-value {
  margin: 8px 0 0 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground);
}

/* Assignments list */
.assignment-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
}

.assignment-title {
  margin: 0;
  font-weight: 700;
  color: var(--foreground);
}

.assignment-sub {
  margin: 6px 0 0 0;
  color: var(--muted-foreground);
  font-size: 13px;
}

.status {
  padding: 10px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--input-background);
  color: var(--foreground);
}

.view-toggle {
  display: flex;
  gap: 10px;
}

.view-btn {
  padding: 10px 14px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--input-background);
  color: var(--foreground);
  cursor: pointer;
  font-weight: 600;
}

.view-btn.active {
  background: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.stat-card {
  text-align: left;
  cursor: pointer;
}

.stat-card.active {
  outline: 2px solid rgba(3, 2, 19, 0.25);
}

/* Mobile */
@media (max-width: 800px) {
  .page-header { flex-direction: column; align-items: flex-start; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .assignment-card { flex-direction: column; align-items: flex-start; }
  .status { width: 100%; }
}

/* --- Buttons / toggles --- */
.view-btn.active {
  background: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.stat-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  transition: transform 0.05s ease, box-shadow 0.15s ease;
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

/* --- Group headers --- */
.group {
  margin-top: 12px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 14px 0 10px;
}

.group-title {
  font-size: 16px;
  font-weight: 800;
}

.group-count {
  font-size: 12px;
  color: var(--muted-foreground);
}

/* --- Assignment cards --- */
.assignment-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) + 6px);
  padding: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.assignment-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.assignment-top {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.badge {
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--accent);
  color: var(--accent-foreground);
  font-weight: 700;
}

.badge.done { background: rgba(38, 200, 124, 0.14); }
.badge.progress { background: rgba(59, 130, 246, 0.14); }
.badge.todo { background: rgba(234, 179, 8, 0.18); }
.badge.overdue { background: rgba(212, 24, 61, 0.14); }

.course-pill {
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--input-background);
  color: var(--foreground);
  font-weight: 600;
}

.assignment-title {
  font-size: 16px;
  font-weight: 800;
  margin: 0;
}

.assignment-meta {
  font-size: 13px;
  color: var(--muted-foreground);
  margin: 0;
}

.assignment-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status {
  padding: 10px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--input-background);
  color: var(--foreground);
}

.open-link {
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}

/* Mobile */
@media (max-width: 800px) {
  .assignment-card { flex-direction: column; align-items: stretch; }
  .assignment-right { justify-content: space-between; }
}

