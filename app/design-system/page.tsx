import {
  Button,
  Input,
  Badge,
  Card,
  CardStat,
  Skeleton,
  SkeletonCard,
  Spinner,
} from '@/components/ui'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-navy p-8 md:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <header>
          <h1 className="font-display text-4xl font-bold text-ivory mb-2">
            Design System
          </h1>
          <p className="font-body text-gray-muted">
            Assessoria Meireles Cruz — Componentes base
          </p>
        </header>

        {/* Typography */}
        <Section title="Typography">
          <div className="space-y-4">
            <p className="font-display text-4xl font-bold text-ivory">
              Playfair Display — Display
            </p>
            <p className="font-body text-xl text-ivory">
              DM Sans — Body text
            </p>
            <p className="font-mono text-lg text-ivory">
              JetBrains Mono — Monospace
            </p>
          </div>
        </Section>

        {/* Colors */}
        <Section title="Colors">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ColorSwatch name="Navy" color="bg-navy" hex="#0D1B2A" border />
            <ColorSwatch name="Slate" color="bg-slate" hex="#1B2838" />
            <ColorSwatch name="Ivory" color="bg-ivory" hex="#F5F3EE" dark />
            <ColorSwatch name="Gold" color="bg-gold" hex="#C9A84C" />
            <ColorSwatch name="Sage" color="bg-sage" hex="#7A8B6F" />
            <ColorSwatch name="Coral" color="bg-coral" hex="#C4725A" />
            <ColorSwatch
              name="Gray Muted"
              color="bg-gray-muted"
              hex="#94A3B8"
            />
            <ColorSwatch
              name="Gold Muted"
              color="bg-gold-muted"
              hex="rgba(201,168,76,0.15)"
              border
            />
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="space-y-6">
            <Row label="Primary">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </Row>
            <Row label="Ghost">
              <Button variant="ghost" size="sm">
                Small
              </Button>
              <Button variant="ghost" size="md">
                Medium
              </Button>
              <Button variant="ghost" size="lg">
                Large
              </Button>
              <Button variant="ghost" disabled>
                Disabled
              </Button>
            </Row>
            <Row label="Danger">
              <Button variant="danger" size="sm">
                Small
              </Button>
              <Button variant="danger" size="md">
                Medium
              </Button>
              <Button variant="danger" size="lg">
                Large
              </Button>
              <Button variant="danger" disabled>
                Disabled
              </Button>
            </Row>
          </div>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <Input
              id="default"
              label="Nome completo"
              placeholder="Digite seu nome"
            />
            <Input
              id="hint"
              label="E-mail"
              placeholder="nome@email.com"
              hint="Usaremos para enviar relatórios"
            />
            <Input
              id="error"
              label="CPF"
              placeholder="000.000.000-00"
              error="CPF inválido"
            />
            <Input
              id="disabled"
              label="Campo desabilitado"
              placeholder="Indisponível"
              disabled
            />
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="gold">Gold</Badge>
            <Badge variant="sage">Sage</Badge>
            <Badge variant="coral">Coral</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="new">Novo</Badge>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="font-display text-lg font-bold text-ivory mb-2">
                  Card Dark
                </h3>
                <p className="font-body text-sm text-gray-muted">
                  Card padrão para áreas financeiras com tema dark.
                </p>
              </Card>
              <Card hover className="p-6">
                <h3 className="font-display text-lg font-bold text-ivory mb-2">
                  Card Dark Hover
                </h3>
                <p className="font-body text-sm text-gray-muted">
                  Passe o mouse para ver o efeito de elevação.
                </p>
              </Card>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card theme="light" className="p-6">
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  Card Light
                </h3>
                <p className="font-body text-sm text-navy/60">
                  Card para áreas de conteúdo com tema light.
                </p>
              </Card>
              <Card theme="light" hover className="p-6">
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  Card Light Hover
                </h3>
                <p className="font-body text-sm text-navy/60">
                  Versão light com hover habilitado.
                </p>
              </Card>
            </div>
          </div>
        </Section>

        {/* Card Stats */}
        <Section title="Card Stats">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CardStat
              label="Patrimônio total"
              value="R$ 1.240.000"
              trend="up"
              trendValue="+12,4%"
              sub="vs. mês anterior"
            />
            <CardStat
              label="Rentabilidade"
              value="18,7%"
              trend="up"
              trendValue="+2,1pp"
              sub="acumulado 12m"
            />
            <CardStat
              label="Alocação risco"
              value="34%"
              trend="down"
              trendValue="-3,2pp"
              sub="rebalanceamento"
            />
          </div>
        </Section>

        {/* Skeletons */}
        <Section title="Skeletons">
          <div className="space-y-6">
            <div className="space-y-3 max-w-md">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </Section>

        {/* Spinner */}
        <Section title="Spinner">
          <div className="flex items-center gap-6">
            <Spinner />
            <Spinner className="w-8 h-8" />
            <Spinner className="w-12 h-12 border-4" />
          </div>
        </Section>

        {/* Animations */}
        <Section title="Animations">
          <div className="flex flex-wrap gap-6">
            <div className="animate-fade-up">
              <Card className="p-4">
                <p className="font-body text-sm text-ivory">Fade Up</p>
              </Card>
            </div>
            <div className="animate-count-up">
              <Card className="p-4">
                <p className="font-mono text-xl text-ivory">Count Up</p>
              </Card>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-normal text-ivory mb-1">
        {title}
      </h2>
      <div className="h-px bg-gray-muted/20 mb-6" />
      {children}
    </section>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-body font-medium text-gray-muted uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function ColorSwatch({
  name,
  color,
  hex,
  dark = false,
  border = false,
}: {
  name: string
  color: string
  hex: string
  dark?: boolean
  border?: boolean
}) {
  return (
    <div className="space-y-2">
      <div
        className={`h-16 rounded-lg ${color} ${border ? 'border border-gray-muted/20' : ''}`}
      />
      <p
        className={`text-xs font-body font-medium ${dark ? 'text-ivory' : 'text-ivory'}`}
      >
        {name}
      </p>
      <p className="text-xs font-mono text-gray-muted">{hex}</p>
    </div>
  )
}
