/*
 * Data for the "How AI reads your docs" demo (assets/js/retrieval-demo.js).
 *
 * Content is adapted from the Oracle Cloud Native Environment Release 2
 * Kubernetes Clusters guide (Cluster Administration and libvirt Provider
 * chapters): https://docs.oracle.com/en/operating-systems/olcne/2/clusters/
 * Headings follow the guide's table of contents; commands are as published.
 *
 * Both doc sets hold the same facts.
 * - structured: one chunk per topic, headings that name the task, each chunk
 *   self-contained. The heading path is indexed with the text.
 * - unstructured: long pages with vague headings and pronouns, split into
 *   fixed-size chunks the way many RAG pipelines do by default.
 *
 * Ranking is computed live (BM25), so if you edit the text, the results
 * change. Each question lists the phrases a complete answer must contain;
 * the verdict checks whether those phrases reached the model's context.
 */
window.RETRIEVAL_DEMO = {
  topK: 3,
  chunkWords: 40,

  questions: [
    {
      id: 'upgrade',
      text: 'How do I upgrade a cluster to a new Kubernetes release?',
      needs: ['ocne cluster stage', 'ocne node update']
    },
    {
      id: 'backup',
      text: 'How do I back up a cluster?',
      needs: ['ocne cluster backup']
    },
    {
      id: 'console',
      text: 'How do I connect to a node\'s console?',
      needs: ['ocne cluster console']
    }
  ],

  structured: [
    {
      source: 'clusters/update_concept.html',
      heading: 'Cluster Administration › Cluster Updates › Best Practices for Cluster Updates',
      text: 'Back up the etcd database before you update a cluster. Kubernetes minor releases must be applied in sequence: to move from 1.29 to 1.31, upgrade to 1.30 and update all nodes, then upgrade to 1.31. Update the nodes soon after you stage a minor release.'
    },
    {
      source: 'clusters/update_concept.html',
      heading: 'Cluster Administration › Cluster Updates › Installing a Kubernetes Patch Release',
      text: 'Kubernetes patch releases are staged on the nodes automatically, so you don\'t need to stage them. Run ocne cluster info to see which nodes have an update available, then update each node with ocne node update.'
    },
    {
      source: 'clusters/update_concept.html',
      heading: 'Cluster Administration › Cluster Updates › Upgrading to a Kubernetes Minor Release',
      text: 'To upgrade a cluster to a Kubernetes minor release, stage the new version with ocne cluster stage --version 1.33. Run ocne cluster info and check that Update Available is true for each node. Update the control plane nodes one at a time with ocne node update --node mynode, then update each worker node. Confirm the upgrade with kubectl get nodes.'
    },
    {
      source: 'clusters/update_concept.html',
      heading: 'Cluster Administration › Cluster Updates',
      text: 'The ocne node update command drains the node with kubectl drain, installs the staged OCK image, restarts the node, and returns it to the cluster with kubectl uncordon. Nodes are updated one at a time, starting with the control plane nodes.'
    },
    {
      source: 'clusters/backup_concept.html',
      heading: 'Cluster Administration › Cluster Backups › Backing Up a Cluster',
      text: 'Back up a cluster with ocne cluster backup --out mybackup.db. You don\'t need to bring the cluster down. The backup contains the etcd database for the control plane nodes. Application containers aren\'t backed up. The CLI doesn\'t restore a cluster from a backup.'
    },
    {
      source: 'clusters/analyze_task.html',
      heading: 'Cluster Administration › Analyzing a Cluster',
      text: 'To analyze a running cluster, run ocne cluster analyze. To analyze a cluster offline, first create dump files with ocne cluster dump --output-directory $HOME/dump, then run ocne cluster analyze --dump-directory $HOME/dump/.'
    },
    {
      source: 'clusters/console_concept.html',
      heading: 'Cluster Administration › OS Console › Accessing a Node\'s OS Console',
      text: 'To access the OS console of a node, get the node name with kubectl get nodes, then run ocne cluster console --direct --node mynode. This starts a chroot session on the node. Type exit to end the session. To run a single command, add it after --.'
    },
    {
      source: 'clusters/cluster_libvirt_task.html',
      heading: 'libvirt Provider › Creating a libvirt Cluster',
      text: 'To create a cluster with the libvirt provider, set up the host, then run ocne cluster start. To set the number of nodes, use a cluster configuration file, or run ocne cluster start --control-plane-nodes 3 --worker-nodes 5 --virtual-ip 192.168.0.100.'
    }
  ],

  unstructured: [{
    source: 'cluster-maintenance.md',
    text: [
      'Cluster maintenance.',
      'Overview. This page covers updates and other maintenance for your clusters. Updates need planning, because an update affects running workloads. Read the whole page before you start, and make sure you understand the order, because moving to a new release is hard to undo.',
      'Preparation. Save the database first with ocne cluster backup --out mybackup.db. You can only move one release at a time.',
      'Procedure. Set the new version with ocne cluster stage --version 1.33 and check it with ocne cluster info. Then run ocne node update --node mynode on each primary, one at a time, then on everything else. It drains and restarts each one for you. Check with kubectl get nodes.'
    ].join(' ')
  }, {
    source: 'tools.md',
    text: 'Tools. Sometimes you need to look inside. ocne cluster console --direct --node mynode opens a shell. Type exit to leave. You can also add a command after --. If something looks wrong, ocne cluster analyze checks it, and ocne cluster dump saves everything for later.'
  }, {
    source: 'getting-started.md',
    text: 'Getting started. Set up the host, then run ocne cluster start to create a cluster with one node. Use a configuration file to add more nodes, or set them with --control-plane-nodes and --worker-nodes. When it finishes, each node shows in kubectl get nodes.'
  }]
};
