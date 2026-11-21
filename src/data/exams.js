import { languages } from './languages.js';

const facts = {
 python:{ext:'print()',fact:'Python uses indentation to define code blocks.',type:'dynamic',adv:'list comprehension'},
 c:{ext:'printf()',fact:'C is a compiled, statically typed language.',type:'int',adv:'pointers'},
 cpp:{ext:'std::cout',fact:'C++ supports both procedural and object-oriented programming.',type:'int',adv:'RAII'},
 java:{ext:'System.out.println()',fact:'Java source is compiled into bytecode.',type:'String',adv:'generics'},
 javascript:{ext:'console.log()',fact:'JavaScript is commonly used to create interactive web pages.',type:'number',adv:'closures'},
 html:{ext:'<h1>',fact:'HTML provides semantic structure, not visual styling.',type:'element',adv:'landmarks'},
 css:{ext:'color',fact:'CSS applies presentation and layout rules to HTML.',type:'selector',adv:'flexbox'},
 typescript:{ext:'console.log()',fact:'TypeScript extends JavaScript with static types.',type:'string',adv:'type unions'},
 php:{ext:'echo',fact:'PHP variables begin with a dollar sign.',type:'string',adv:'namespaces'},
 sql:{ext:'SELECT',fact:'SQL is used to query relational databases.',type:'VARCHAR',adv:'window functions'},
 csharp:{ext:'Console.WriteLine()',fact:'C# is a primary language for the .NET platform.',type:'string',adv:'LINQ'},
 go:{ext:'fmt.Println()',fact:'Go uses goroutines for concurrent execution.',type:'string',adv:'interfaces'},
 rust:{ext:'println!',fact:'Rust uses ownership and borrowing for memory safety.',type:'i32',adv:'lifetimes'},
 kotlin:{ext:'println()',fact:'Kotlin supports null safety in its type system.',type:'String',adv:'coroutines'},
 swift:{ext:'print()',fact:'Swift uses optionals to represent missing values safely.',type:'String',adv:'protocol extensions'},
 ruby:{ext:'puts',fact:'Ruby is a dynamically typed, object-oriented language.',type:'String',adv:'blocks'},
 dart:{ext:'print()',fact:'Dart is the language used to build Flutter apps.',type:'String',adv:'futures'},
 r:{ext:'print()',fact:'R is optimized for statistical computing and vectors.',type:'numeric',adv:'vectorization'},
 matlab:{ext:'disp()',fact:'MATLAB uses matrices as a fundamental data structure.',type:'double',adv:'broadcasting'},
 bash:{ext:'echo',fact:'Bash variables are assigned without a dollar sign.',type:'string',adv:'process substitution'}
};

export const exams = Object.fromEntries(languages.map(language=>{
  const f=facts[language.slug];
  const bank=[
    {q:`What is the main output command or construct associated with ${language.name}?`,options:[f.ext,'/download','import hardware','start-server'],answer:0,explanation:`${f.ext} is the standard basic output mechanism shown for ${language.name}.`},
    {q:`Which statement correctly describes ${language.name}?`,options:[f.fact,'It has no compiler or interpreter','It cannot process text','It is exclusively for 3D graphics'],answer:0,explanation:f.fact},
    {q:`What does a variable represent in ${language.name}?`,options:['A named value stored for use','A permanent file name','Only a keyboard shortcut','A compiled binary'],answer:0,explanation:'Variables give a name to values so a program can read or update them.'},
    {q:`Which of these is a common ${f.type} data representation in ${language.name}?`,options:[f.type,'3D printer','CPU socket','network cable'],answer:0,explanation:`${f.type} is a relevant type or representation for this language.`},
    {q:`Which control structure chooses between two outcomes?`,options:['An if/else or conditional expression','A comment','A package manager','A file extension'],answer:0,explanation:'Conditionals allow code to execute different paths based on a condition.'},
    {q:`Why are loops used?`,options:['To repeat a sequence of operations','To prevent all output','To define only comments','To replace variables'],answer:0,explanation:'Loops repeat operations for counts or collections.'},
    {q:`What is the purpose of a function or method?`,options:['To package reusable behavior','To permanently pause the computer','To remove the language','To encrypt every file'],answer:0,explanation:'Functions and methods organize reusable operations behind a callable name.'},
    {q:`Which structure commonly stores multiple values in ${language.name}?`,options:['Array, collection, vector, or list','A single punctuation mark','A monitor setting','A mouse click'],answer:0,explanation:`${language.name} provides a collection construct suited to storing multiple values.`},
    {q:`Which advanced concept is especially associated with ${language.name}?`,options:[f.adv,'printer calibration','monitor gamma','physical cooling'],answer:0,explanation:`${f.adv} is a language-specific concept that matters in real ${language.name} development.`},
    {q:`What is the best first step when a ${language.name} program produces an unexpected result?`,options:['Check input values and trace execution','Ignore the result','Delete the entire project','Replace the monitor'],answer:0,explanation:'Tracing inputs, control flow, and intermediate values identifies the cause reliably.'}
  ];
  return [language.slug,bank];
}));
