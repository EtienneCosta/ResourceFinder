// Generated from /Users/etiennecosta/Desktop/Mestrado/PLC/GCS/Antlr4/Turma/Turma.g4 by ANTLR 4.8
 
import java.util.* ;

import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class TurmaParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, TURMA=6, PALAVRA=7, NOTA=8, WS=9;
	public static final int
		RULE_turma = 0, RULE_alunos = 1, RULE_aluno = 2, RULE_notas = 3, RULE_nome = 4;
	private static String[] makeRuleNames() {
		return new String[] {
			"turma", "alunos", "aluno", "notas", "nome"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'.'", "';'", "'('", "','", "')'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, "TURMA", "PALAVRA", "NOTA", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Turma.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	 

	public int sum(List<Integer> array){
	      int res=0;
	      for(Integer nota: array)
	            res+=nota;
	            return res;
	      }


	public TurmaParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class TurmaContext extends ParserRuleContext {
		public AlunosContext alunos;
		public TerminalNode TURMA() { return getToken(TurmaParser.TURMA, 0); }
		public TerminalNode PALAVRA() { return getToken(TurmaParser.PALAVRA, 0); }
		public AlunosContext alunos() {
			return getRuleContext(AlunosContext.class,0);
		}
		public TurmaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_turma; }
	}

	public final TurmaContext turma() throws RecognitionException {
		TurmaContext _localctx = new TurmaContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_turma);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(10);
			match(TURMA);
			setState(11);
			match(PALAVRA);
			setState(12);
			((TurmaContext)_localctx).alunos = alunos();
			      System.out.println();
			                                    System.out.println("Total de alunos: "+((TurmaContext)_localctx).alunos.totalAlunos);
			                                    System.out.println("----------------------------------------------");

			                             
			setState(14);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AlunosContext extends ParserRuleContext {
		public int totalAlunos;
		public List <String> nomes = new ArrayList<>();
		public List<AlunoContext> aluno() {
			return getRuleContexts(AlunoContext.class);
		}
		public AlunoContext aluno(int i) {
			return getRuleContext(AlunoContext.class,i);
		}
		public AlunosContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_alunos; }
	}

	public final AlunosContext alunos() throws RecognitionException {
		AlunosContext _localctx = new AlunosContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_alunos);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(16);
			aluno(_localctx.nomes);
			 ((AlunosContext)_localctx).totalAlunos = 1 ; 
			setState(24);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__1) {
				{
				{
				setState(18);
				match(T__1);
				setState(19);
				aluno(_localctx.nomes);
				_localctx.totalAlunos++;
				}
				}
				setState(26);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AlunoContext extends ParserRuleContext {
		public List <String> n;
		public NomeContext nome;
		public NotasContext notas;
		public NomeContext nome() {
			return getRuleContext(NomeContext.class,0);
		}
		public NotasContext notas() {
			return getRuleContext(NotasContext.class,0);
		}
		public AlunoContext(ParserRuleContext parent, int invokingState) { super(parent, invokingState); }
		public AlunoContext(ParserRuleContext parent, int invokingState, List <String> n) {
			super(parent, invokingState);
			this.n = n;
		}
		@Override public int getRuleIndex() { return RULE_aluno; }
	}

	public final AlunoContext aluno(List <String> n) throws RecognitionException {
		AlunoContext _localctx = new AlunoContext(_ctx, getState(), n);
		enterRule(_localctx, 4, RULE_aluno);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(27);
			((AlunoContext)_localctx).nome = nome();
			setState(28);
			((AlunoContext)_localctx).notas = notas();
			  
			                        System.out.println();
			                        System.out.println("----------------------------------------------");
			                        if(_localctx.n.contains((((AlunoContext)_localctx).nome!=null?_input.getText(((AlunoContext)_localctx).nome.start,((AlunoContext)_localctx).nome.stop):null)))
			                           System.out.println("ALUNO(A) COM O NOME REPETIDO: " +(((AlunoContext)_localctx).nome!=null?_input.getText(((AlunoContext)_localctx).nome.start,((AlunoContext)_localctx).nome.stop):null)+" --- Erro Semântico");
			                        else
			                              _localctx.n.add((((AlunoContext)_localctx).nome!=null?_input.getText(((AlunoContext)_localctx).nome.start,((AlunoContext)_localctx).nome.stop):null));
			                        System.out.println("Aluno: "+(((AlunoContext)_localctx).nome!=null?_input.getText(((AlunoContext)_localctx).nome.start,((AlunoContext)_localctx).nome.stop):null));
			                        if(!(((AlunoContext)_localctx).notas.notasA.size()>=4 &&((AlunoContext)_localctx).notas.notasA.size()<=6))
			                        System.out.println("Número de notas: "+((AlunoContext)_localctx).notas.notasA.size()+" ∉ [4,6] --- Erro Semântico");
			                        System.out.println("Notas:");
			                        for(Integer nota:((AlunoContext)_localctx).notas.notasA){
			                              if(nota>=0&&nota<=20)
			                                    System.out.println("       "+nota);
			                              else
			                                    System.out.println("       "+nota+ "  ∉  [0,20] --- Erro Semântico ");



			                        }
			                        System.out.println("Média: "+(double)sum(((AlunoContext)_localctx).notas.notasA)/((AlunoContext)_localctx).notas.notasA.size());
			                        System.out.println("----------------------------------------------");



			                   
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NotasContext extends ParserRuleContext {
		public List <Integer> notasA = new ArrayList<>();
		public Token n1;
		public Token n2;
		public List<TerminalNode> NOTA() { return getTokens(TurmaParser.NOTA); }
		public TerminalNode NOTA(int i) {
			return getToken(TurmaParser.NOTA, i);
		}
		public NotasContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_notas; }
	}

	public final NotasContext notas() throws RecognitionException {
		NotasContext _localctx = new NotasContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_notas);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(31);
			match(T__2);
			setState(32);
			((NotasContext)_localctx).n1 = match(NOTA);
			_localctx.notasA.add((((NotasContext)_localctx).n1!=null?Integer.valueOf(((NotasContext)_localctx).n1.getText()):0)); 
			setState(39);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__3) {
				{
				{
				setState(34);
				match(T__3);
				setState(35);
				((NotasContext)_localctx).n2 = match(NOTA);
				_localctx.notasA.add((((NotasContext)_localctx).n2!=null?Integer.valueOf(((NotasContext)_localctx).n2.getText()):0));
				}
				}
				setState(41);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(42);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NomeContext extends ParserRuleContext {
		public TerminalNode PALAVRA() { return getToken(TurmaParser.PALAVRA, 0); }
		public NomeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nome; }
	}

	public final NomeContext nome() throws RecognitionException {
		NomeContext _localctx = new NomeContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_nome);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(44);
			match(PALAVRA);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\13\61\4\2\t\2\4\3"+
		"\t\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\7\3\31\n\3\f\3\16\3\34\13\3\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\5"+
		"\3\5\7\5(\n\5\f\5\16\5+\13\5\3\5\3\5\3\6\3\6\3\6\2\2\7\2\4\6\b\n\2\2\2"+
		"-\2\f\3\2\2\2\4\22\3\2\2\2\6\35\3\2\2\2\b!\3\2\2\2\n.\3\2\2\2\f\r\7\b"+
		"\2\2\r\16\7\t\2\2\16\17\5\4\3\2\17\20\b\2\1\2\20\21\7\3\2\2\21\3\3\2\2"+
		"\2\22\23\5\6\4\2\23\32\b\3\1\2\24\25\7\4\2\2\25\26\5\6\4\2\26\27\b\3\1"+
		"\2\27\31\3\2\2\2\30\24\3\2\2\2\31\34\3\2\2\2\32\30\3\2\2\2\32\33\3\2\2"+
		"\2\33\5\3\2\2\2\34\32\3\2\2\2\35\36\5\n\6\2\36\37\5\b\5\2\37 \b\4\1\2"+
		" \7\3\2\2\2!\"\7\5\2\2\"#\7\n\2\2#)\b\5\1\2$%\7\6\2\2%&\7\n\2\2&(\b\5"+
		"\1\2\'$\3\2\2\2(+\3\2\2\2)\'\3\2\2\2)*\3\2\2\2*,\3\2\2\2+)\3\2\2\2,-\7"+
		"\7\2\2-\t\3\2\2\2./\7\t\2\2/\13\3\2\2\2\4\32)";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}